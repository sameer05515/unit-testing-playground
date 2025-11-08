# Database Migration Evaluation

## Executive Summary

This document evaluates the need for database migration from the current file-based storage system to a database solution for the Express PDF Viewer application.

**Current State**: File-based JSON storage
**Evaluation Date**: 2025-11-05
**Recommendation**: Hybrid approach - keep file-based for simple use cases, consider database for complex queries

---

## Current Data Architecture

### Data Types Stored:
1. **Chat Conversations** - Large JSON files (snapshots)
2. **Conversation Metadata** - Snapshot names, counts, dates
3. **Message Content** - Individual messages within conversations
4. **Page Data** - Static configuration data
5. **PDF File Metadata** - File paths, slugs, navigation

### Storage Pattern:
- JSON files in `public/data/` directory
- Processed data in `D:/v-dir/itr2/` directory
- Static configuration in code files

### Current Limitations:
- No efficient querying (must load entire files)
- No indexing for fast searches
- Limited concurrent access
- File I/O overhead for large files
- No transactional support
- Difficult to implement relationships

---

## Database Options Evaluation

### Option 1: SQLite (Recommended for MVP)

**Pros:**
- ✅ Zero configuration (file-based database)
- ✅ No separate server needed
- ✅ ACID compliant
- ✅ Good for read-heavy workloads
- ✅ Easy to backup (just copy file)
- ✅ SQL querying capabilities
- ✅ Indexing support
- ✅ Low overhead

**Cons:**
- ❌ Write concurrency limitations
- ❌ Limited scalability
- ❌ Not ideal for high-write scenarios

**Use Case**: Small to medium datasets, development/testing, simple queries

**Migration Effort**: Low - Easy to set up and migrate

---

### Option 2: PostgreSQL

**Pros:**
- ✅ Full-featured relational database
- ✅ Excellent JSON support (JSONB)
- ✅ Advanced querying capabilities
- ✅ Excellent indexing (GIN, GiST for JSON)
- ✅ Scalable and robust
- ✅ Strong consistency
- ✅ Full-text search capabilities

**Cons:**
- ❌ Requires separate database server
- ❌ More complex setup
- ❌ Higher resource usage
- ❌ More maintenance overhead

**Use Case**: Production environments, complex queries, large datasets, need for relationships

**Migration Effort**: Medium - Requires database server setup

---

### Option 3: MongoDB

**Pros:**
- ✅ Document-based (similar to JSON structure)
- ✅ Easy to store nested JSON structures
- ✅ Flexible schema
- ✅ Good for rapid development
- ✅ Horizontal scaling

**Cons:**
- ❌ Eventual consistency (not ACID by default)
- ❌ More complex queries for relationships
- ❌ Requires separate server
- ❌ More memory usage

**Use Case**: Document-heavy workloads, flexible schemas, rapid prototyping

**Migration Effort**: Medium - Requires database server setup

---

### Option 4: Hybrid Approach (Recommended)

**Strategy**: Use file-based storage for simple use cases, database for complex queries

**Implementation:**
- Keep file-based storage for:
  - Static configuration
  - Large conversation snapshots (archive)
  - Simple metadata lookups
  
- Use database for:
  - Frequently queried metadata
  - Search indexes
  - Relationship data
  - Analytics and aggregations

**Benefits:**
- ✅ Best of both worlds
- ✅ Gradual migration
- ✅ Lower initial complexity
- ✅ Can optimize later

---

## Recommended Migration Path

### Phase 1: Evaluation (Current)
- ✅ Document current data patterns
- ✅ Identify query patterns
- ✅ Evaluate performance bottlenecks

### Phase 2: Hybrid Implementation (Recommended Next Step)
1. **Add SQLite for metadata**:
   - Snapshot metadata (names, dates, counts)
   - Conversation indexes
   - Search indexes
   
2. **Keep JSON files for content**:
   - Large conversation data
   - Message content
   - Archive storage

3. **Implement caching layer**:
   - Already done in Phase 2
   - Cache database queries
   - Cache file reads

### Phase 3: Full Migration (If Needed)
- Migrate to PostgreSQL if:
  - Dataset grows significantly
  - Complex queries become frequent
  - Need for relationships increases
  - Multiple concurrent users

---

## Data Model Proposal (SQLite)

### Tables:

```sql
-- Snapshots table
CREATE TABLE snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version TEXT UNIQUE NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  conversation_count INTEGER,
  message_count INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Conversations table
CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  snapshot_version TEXT NOT NULL,
  title TEXT,
  create_time INTEGER,
  update_time INTEGER,
  message_count INTEGER,
  FOREIGN KEY (snapshot_version) REFERENCES snapshots(version)
);

-- Message indexes table
CREATE TABLE message_indexes (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  author TEXT,
  create_time INTEGER,
  content_preview TEXT,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- Search indexes
CREATE INDEX idx_conversations_snapshot ON conversations(snapshot_version);
CREATE INDEX idx_messages_conversation ON message_indexes(conversation_id);
CREATE INDEX idx_messages_author ON message_indexes(author);
CREATE INDEX idx_messages_content ON message_indexes(content_preview);
```

---

## Migration Scripts Needed

1. **Data Migration Script**:
   - Read JSON files
   - Extract metadata
   - Insert into database
   - Maintain file references

2. **Sync Script**:
   - Periodically sync new files
   - Update metadata
   - Rebuild indexes

3. **Query Layer**:
   - Abstract database/file access
   - Provide unified API
   - Handle fallback to files

---

## Performance Comparison

### Current (File-based):
- Metadata lookup: ~10-50ms (file read + parse)
- Search: ~100-500ms (full file scan)
- Pagination: ~50-200ms (load + slice)

### With SQLite:
- Metadata lookup: ~1-5ms (indexed query)
- Search: ~10-50ms (indexed query)
- Pagination: ~5-20ms (SQL LIMIT/OFFSET)

**Expected Improvement**: 5-10x faster for common queries

---

## Cost-Benefit Analysis

### Benefits:
- ✅ Faster queries (5-10x improvement)
- ✅ Better search capabilities
- ✅ Easier to implement relationships
- ✅ Better concurrent access
- ✅ Transactional support

### Costs:
- ❌ Additional complexity
- ❌ Database maintenance
- ❌ Migration effort
- ❌ Storage overhead (duplication during transition)

### Recommendation:
**Start with Hybrid Approach** - Add SQLite for metadata, keep files for content. This provides 80% of benefits with 20% of the effort.

---

## Implementation Checklist

- [ ] Set up SQLite database
- [ ] Create migration scripts
- [ ] Implement data access layer abstraction
- [ ] Add database indexes
- [ ] Update API endpoints to use database
- [ ] Add sync mechanism for new files
- [ ] Performance testing
- [ ] Documentation

---

## Conclusion

**Current Recommendation**: **Hybrid Approach with SQLite**

- Add SQLite for frequently queried metadata
- Keep JSON files for large content
- Use existing caching layer
- Gradual migration path

**Future Consideration**: Move to PostgreSQL if:
- Dataset exceeds 10GB
- Need for complex queries increases
- Multiple concurrent writers needed
- Production deployment requires it

---

**Document Version**: 1.0
**Last Updated**: 2025-11-05

