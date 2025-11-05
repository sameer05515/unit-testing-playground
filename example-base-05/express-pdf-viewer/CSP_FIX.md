# Content Security Policy (CSP) Fix

## Problem

After implementing Helmet middleware in Phase 1, the application was blocking external CDN resources due to strict Content Security Policy (CSP) directives. This caused errors like:

```
Refused to load the script 'https://cdn.jsdelivr.net/npm/marked/marked.min.js' 
because it violates the following Content Security Policy directive: "script-src 'self'"
```

## Solution

Updated Helmet configuration to allow trusted CDN sources while maintaining security.

## CDNs Used in Application

The application uses the following CDNs:

1. **cdn.jsdelivr.net** - Bootstrap, Marked.js, Alpine.js, Chart.js
2. **cdnjs.cloudflare.com** - Highlight.js, Marked.js, Prism.js
3. **cdn.tailwindcss.com** - Tailwind CSS Play CDN
4. **unpkg.com** - Alpine.js (alternative)

## CSP Configuration

### Development Mode
- More permissive CSP for easier debugging
- Allows `'unsafe-eval'` for Tailwind Play CDN
- Allows all trusted CDNs

### Production Mode
- Stricter CSP policy
- Still allows trusted CDNs but without `'unsafe-eval'`
- Enables `upgradeInsecureRequests` for HTTPS enforcement

## Configuration Details

### Script Sources
- `'self'` - Local scripts
- `'unsafe-inline'` - Required for inline scripts in EJS templates
- `'unsafe-eval'` - Only in development (for Tailwind Play CDN)
- Trusted CDN domains

### Style Sources
- `'self'` - Local stylesheets
- `'unsafe-inline'` - Required for inline styles and Tailwind
- Trusted CDN domains

### Connect Sources
- `'self'` - Local API calls
- CDNs (for source maps and API calls)

### Other Directives
- `fontSrc` - Allows fonts from CDNs
- `imgSrc` - Allows images from any HTTPS source (including data URIs)
- `objectSrc` - Blocks object/embed tags (security)

## Security Considerations

1. **Trusted CDNs Only**: Only well-known, reputable CDNs are whitelisted
2. **HTTPS Only**: All CDN sources use HTTPS
3. **No Object/Embed**: Blocks potentially dangerous object tags
4. **Production Stricter**: Production mode has stricter policies

## Testing

After applying this fix:
1. Refresh the browser
2. Check browser console for CSP errors
3. Verify all CDN resources load correctly
4. Test functionality that depends on external scripts (Bootstrap, Marked.js, etc.)

## Alternative Solutions

If you want even stricter security:

1. **Self-host libraries**: Download and serve libraries from your own server
2. **Subresource Integrity (SRI)**: Add integrity hashes to script tags
3. **Remove inline scripts**: Move all inline scripts to external files

## Files Modified

- `src/app.v2.js` - Updated Helmet CSP configuration

## Related Documentation

- [Helmet CSP Documentation](https://helmetjs.github.io/)
- [Content Security Policy Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

