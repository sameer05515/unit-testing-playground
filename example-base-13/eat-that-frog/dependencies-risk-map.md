# 🗺️ Dependencies & Risk Map - Frog Productivity Tracker

## Dependency Graph

```
EPIC 1: Frog Productivity Tracker
│
├── STORY 1: Create Frog Task (Foundation)
│   └── No dependencies
│
├── STORY 2: View Task List
│   └── Depends on: STORY 1 (needs tasks to exist)
│
├── STORY 3: Complete Task
│   └── Depends on: STORY 1 (needs tasks to exist)
│
├── STORY 4: Reorder Tasks
│   ├── Depends on: STORY 1 (task creation)
│   └── Depends on: STORY 2 (task list view)
│
├── STORY 5: Delete Task
│   └── Depends on: STORY 1 (needs tasks to exist)
│
├── STORY 6: Daily Reset
│   └── Depends on: STORY 3 (completion status)
│
├── STORY 7: Streak Counter
│   ├── Depends on: STORY 3 (completion tracking)
│   └── Depends on: STORY 9 (user authentication - if user-scoped)
│
└── STORY 8: CSV Export
    └── Depends on: STORY 2 (task list data)

EPIC 2: Platform Enhancements
│
├── STORY 9: Authentication
│   └── No dependencies (can be parallel with EPIC 1)
│
├── STORY 10: Analytics Dashboard
│   ├── Depends on: STORY 1-8 (needs data to analyze)
│   └── Depends on: STORY 9 (user-scoped analytics)
│
└── STORY 11: Mobile UX
    └── Depends on: STORY 1-8 (all core features)
```

---

## Critical Path Analysis

### Must-Have Sequence (Blocking Dependencies)

```
Sprint 1:
  STORY 1 (Create) → STORY 2 (View) → STORY 5 (Delete)
  
Sprint 2:
  STORY 3 (Complete) → STORY 6 (Reset) [depends on completion]
  STORY 7 (Streak) [depends on STORY 3]
  
Sprint 3:
  STORY 4 (Reorder) [depends on STORY 1 + STORY 2]
  
Sprint 4:
  STORY 9 (Auth) → STORY 10 (Analytics) [if user-scoped]
  
Sprint 5:
  STORY 11 (Mobile) [can be parallel, but needs all features]
```

### Parallel Work Opportunities

- **STORY 8 (CSV Export)** can be developed in parallel with STORY 3-7
- **STORY 9 (Authentication)** can start early, but integration happens in Sprint 4
- **STORY 11 (Mobile UX)** can begin responsive work early, but touch gestures need core features

---

## Risk Assessment Matrix

### 🔴 High Risk / High Impact

| Story | Risk | Impact | Mitigation |
|-------|------|--------|------------|
| **STORY 4: Reorder Tasks** | Browser compatibility issues with drag & drop | Users can't reorder tasks | - Test on all major browsers<br>- Have fallback (manual priority input)<br>- Use well-maintained library |
| **STORY 9: Authentication** | Security vulnerabilities | Data breach, unauthorized access | - Security code review<br>- Penetration testing<br>- Follow OWASP guidelines<br>- Use proven libraries (Spring Security) |
| **STORY 7: Streak Counter** | Timezone/date logic bugs | Incorrect streak calculations | - Comprehensive date testing<br>- Use UTC internally<br>- Clear timezone documentation |

### 🟡 Medium Risk / Medium Impact

| Story | Risk | Impact | Mitigation |
|-------|------|--------|------------|
| **STORY 10: Analytics** | Performance issues with large datasets | Slow dashboard, poor UX | - Database indexing<br>- Query optimization<br>- Caching strategy<br>- Pagination |
| **STORY 2: View Task List** | Sorting performance with many tasks | Slow page load | - Limit initial load<br>- Implement pagination<br>- Virtual scrolling |
| **STORY 4: Reorder Tasks** | Race conditions in bulk updates | Data inconsistency | - Transactional updates<br>- Optimistic locking<br>- Conflict resolution |

### 🟢 Low Risk / Low Impact

| Story | Risk | Impact | Mitigation |
|-------|------|--------|------------|
| **STORY 5: Delete Task** | Accidental deletion | User loses data | - Confirmation dialog<br>- Soft delete option |
| **STORY 8: CSV Export** | Large file generation | Browser memory issues | - Streaming export<br>- Chunk processing |
| **STORY 11: Mobile UX** | Touch gesture conflicts | Poor mobile experience | - User testing<br>- Fallback interactions |

---

## Technical Dependencies

### External Libraries

| Dependency | Used In | Risk Level | Alternative |
|------------|---------|------------|-------------|
| **react-beautiful-dnd** | STORY 4 | Medium | @dnd-kit, react-dnd |
| **JWT Library** | STORY 9 | Low | jjwt, java-jwt |
| **Chart Library** | STORY 10 | Low | Chart.js, Recharts, ApexCharts |
| **PDF Library** | (Future) | N/A | pdf-lib, jsPDF |

### Infrastructure Dependencies

| Component | Required For | Risk Level |
|------------|--------------|------------|
| **Database** | All stories | High - Single point of failure |
| **JWT Secret Key** | STORY 9 | High - Security critical |
| **HTTPS** | STORY 9 | High - Required for production |
| **CDN** | STORY 11 | Low - Performance optimization |

---

## Blocking Dependencies

### Story-Level Blockers

```
STORY 2 (View List) BLOCKED BY → STORY 1 (Create)
  - Cannot test viewing without tasks
  - Priority: HIGH

STORY 3 (Complete) BLOCKED BY → STORY 1 (Create)
  - Cannot toggle completion without tasks
  - Priority: HIGH

STORY 4 (Reorder) BLOCKED BY → STORY 1 + STORY 2
  - Needs tasks and list view
  - Priority: HIGH

STORY 6 (Reset) BLOCKED BY → STORY 3 (Complete)
  - Needs completion functionality
  - Priority: MEDIUM

STORY 7 (Streak) BLOCKED BY → STORY 3 (Complete)
  - Needs completion tracking
  - Priority: MEDIUM

STORY 10 (Analytics) BLOCKED BY → STORY 1-8 (All core features)
  - Needs data to analyze
  - Priority: MEDIUM (can show empty state)

STORY 11 (Mobile) BLOCKED BY → STORY 1-8 (All features)
  - Needs features to make mobile-friendly
  - Priority: LOW (can start responsive work early)
```

### Subtask-Level Blockers

```
BE-2 (JPA Entity) BLOCKS → BE-1 (POST endpoint)
  - Endpoint needs entity to save
  - Priority: HIGH

BE-1 (POST endpoint) BLOCKS → FE-1 (Input UI)
  - UI needs endpoint to submit to
  - Priority: MEDIUM (can mock API)

FE-1 (Input UI) BLOCKS → FE-2 (Validation)
  - Validation needs form structure
  - Priority: LOW

BE-1 (GET endpoint) BLOCKS → FE-2 (Load on refresh)
  - Frontend needs data source
  - Priority: HIGH
```

---

## Risk Mitigation Strategies

### 1. Parallel Development
- **Backend and Frontend** can work in parallel with API contracts
- Use **API mocking** (MSW, json-server) for frontend development
- **Contract testing** to ensure compatibility

### 2. Incremental Delivery
- Deliver **MVP** after Sprint 1 (Create + View + Delete)
- Add features incrementally
- **Feature flags** for gradual rollout

### 3. Technical Spikes
- **Spike STORY 4** drag & drop early (complexity)
- **Spike STORY 9** authentication architecture (security)
- **Spike STORY 10** analytics queries (performance)

### 4. Testing Strategy
- **Unit tests** for business logic (STORY 7 date logic)
- **Integration tests** for API endpoints
- **E2E tests** for critical paths (auth flow)
- **Performance tests** for analytics

### 5. Rollback Plans
- **Database migrations** with rollback scripts
- **Feature flags** for quick disable
- **API versioning** for backward compatibility

---

## Dependency Timeline

### Week 1-2 (Sprint 1)
```
Day 1-2: STORY 1 Backend (BE-2 → BE-1 → BE-3)
Day 3-4: STORY 1 Frontend (FE-1 → FE-2)
Day 5-6: STORY 2 Backend + Frontend
Day 7-8: STORY 5 (Quick win)
Day 9-10: STORY 6 + QA
```

### Week 3-4 (Sprint 2)
```
Day 1-2: STORY 3 Backend + Frontend
Day 3-5: STORY 7 Backend (complex date logic)
Day 6-7: STORY 7 Frontend
Day 8-9: STORY 8 (can be parallel)
Day 10: QA + Bug fixes
```

### Week 5-6 (Sprint 3)
```
Day 1-3: STORY 4 Backend (bulk update logic)
Day 4-7: STORY 4 Frontend (drag & drop implementation)
Day 8-9: Integration testing
Day 10: Performance optimization
```

### Week 7-8 (Sprint 4)
```
Day 1-4: STORY 9 Backend (security-critical)
Day 5-7: STORY 9 Frontend
Day 8-10: STORY 10 (analytics)
```

### Week 9-10 (Sprint 5)
```
Day 1-5: STORY 11 (responsive + touch)
Day 6-8: Cross-browser testing
Day 9-10: Final polish + documentation
```

---

## Contingency Plans

### If STORY 4 (Reorder) is too complex:
- **Fallback:** Manual priority input field
- **Defer** to next sprint
- **Simplify:** Only allow up/down arrows instead of drag & drop

### If STORY 9 (Auth) has security issues:
- **Extend** sprint timeline
- **Bring in** security expert for review
- **Use** managed auth service (Auth0, Firebase) as backup

### If STORY 10 (Analytics) is slow:
- **Optimize** queries first
- **Add** caching layer
- **Limit** date range for initial release

### If team member is unavailable:
- **Cross-train** team members
- **Document** knowledge thoroughly
- **Pair programming** for knowledge transfer

---

## Success Criteria

### Must Have (MVP)
- ✅ Create, view, delete tasks
- ✅ Mark tasks as complete
- ✅ Basic priority sorting

### Should Have
- ✅ Task reordering
- ✅ Daily reset
- ✅ Streak counter

### Nice to Have
- ✅ CSV export
- ✅ Authentication
- ✅ Analytics dashboard
- ✅ Mobile optimization

---

## Communication Plan

### Daily Standups
- Discuss **blockers** immediately
- Update **dependency status**
- Share **API contract changes**

### Sprint Planning
- Review **dependency graph**
- Identify **risks early**
- Plan **spike stories** if needed

### Retrospectives
- Analyze **dependency issues**
- Improve **parallel work** opportunities
- Refine **risk mitigation** strategies
