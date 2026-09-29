# 🔧 Technical Task Breakdown - Frog Productivity Tracker

## Technology Stack Recommendations

### Backend
- **Framework:** Spring Boot 3.x
- **Database:** PostgreSQL / MySQL
- **ORM:** Spring Data JPA
- **Security:** Spring Security + JWT
- **Testing:** JUnit 5, Mockito, TestContainers

### Frontend
- **Framework:** React 18+ / Vue 3 / Angular 18
- **State Management:** Redux Toolkit / Zustand / Pinia
- **HTTP Client:** Axios / Fetch API
- **Drag & Drop:** react-beautiful-dnd / @dnd-kit / vue-draggable
- **Charts:** Chart.js / Recharts / ApexCharts
- **Styling:** Tailwind CSS / Material-UI / Bootstrap

---

## Story-by-Story Technical Implementation

### STORY 1: Create Frog Task (3 SP)

#### Backend Tasks
```java
// Entity: Task.java
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    private String description;
    
    @Column(nullable = false)
    private Integer priority; // Lower = higher priority (1 = most important)
    
    @Column(nullable = false)
    private Boolean completed = false;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    // Getters, setters, constructors
}

// Controller: TaskController.java
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody @Valid TaskCreateRequest request) {
        // Implementation
    }
}

// Service: TaskService.java
@Service
public class TaskService {
    public Task createTask(TaskCreateRequest request) {
        // Validation
        // Priority assignment logic
        // Save to database
    }
}
```

#### Frontend Tasks
```jsx
// Component: TaskForm.jsx
const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    // Client-side validation
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // API call to POST /api/tasks
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

**API Contract:**
```
POST /api/tasks
Request Body: { "title": string, "description": string, "priority": number }
Response: 201 Created, { "id": number, "title": string, ... }
```

---

### STORY 2: View Task List (2 SP)

#### Backend Tasks
```java
// Repository: TaskRepository.java
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByOrderByPriorityAsc();
    List<Task> findAllByCompletedFalseOrderByPriorityAsc();
}

// Controller
@GetMapping
public ResponseEntity<List<TaskDTO>> getAllTasks() {
    List<Task> tasks = taskRepository.findAllByOrderByPriorityAsc();
    return ResponseEntity.ok(tasks.stream()
        .map(this::toDTO)
        .collect(Collectors.toList()));
}
```

#### Frontend Tasks
```jsx
// Component: TaskList.jsx
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    // GET /api/tasks
    // Sort by priority
    // Update state
  };
  
  return (
    <div>
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>
  );
};
```

**API Contract:**
```
GET /api/tasks
Response: 200 OK, [{ "id": number, "title": string, "priority": number, ... }]
```

---

### STORY 3: Complete Task (2 SP)

#### Backend Tasks
```java
// Controller
@PutMapping("/{id}/toggle")
public ResponseEntity<TaskDTO> toggleTask(@PathVariable Long id) {
    Task task = taskService.toggleCompletion(id);
    return ResponseEntity.ok(toDTO(task));
}

// Service
public Task toggleTask(Long id) {
    Task task = findById(id);
    task.setCompleted(!task.getCompleted());
    return taskRepository.save(task);
}
```

#### Frontend Tasks
```jsx
// Component: TaskItem.jsx
const TaskItem = ({ task }) => {
  const handleToggle = async () => {
    // PUT /api/tasks/{id}/toggle
    // Update local state
  };
  
  return (
    <div>
      <input 
        type="checkbox" 
        checked={task.completed}
        onChange={handleToggle}
      />
      <span className={task.completed ? 'line-through' : ''}>
        {task.title}
      </span>
    </div>
  );
};
```

**API Contract:**
```
PUT /api/tasks/{id}/toggle
Response: 200 OK, { "id": number, "completed": boolean, ... }
```

---

### STORY 4: Reorder Tasks (5 SP) ⚠️ Complex

#### Backend Tasks
```java
// Controller
@PutMapping("/reorder")
public ResponseEntity<Void> reorderTasks(@RequestBody List<TaskReorderRequest> requests) {
    taskService.reorderTasks(requests);
    return ResponseEntity.ok().build();
}

// Service
@Transactional
public void reorderTasks(List<TaskReorderRequest> requests) {
    for (TaskReorderRequest req : requests) {
        Task task = findById(req.getId());
        task.setPriority(req.getPriority());
        taskRepository.save(task);
    }
    // Consider batch update for performance
}
```

#### Frontend Tasks
```jsx
// Using react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = () => {
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    
    // Reorder local state
    const newTasks = reorder(tasks, result.source.index, result.destination.index);
    setTasks(newTasks);
    
    // Update priorities
    const priorityUpdates = newTasks.map((task, index) => ({
      id: task.id,
      priority: index + 1
    }));
    
    // PUT /api/tasks/reorder
    await api.reorderTasks(priorityUpdates);
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {/* Draggable items */}
      </Droppable>
    </DragDropContext>
  );
};
```

**API Contract:**
```
PUT /api/tasks/reorder
Request Body: [{ "id": number, "priority": number }, ...]
Response: 200 OK
```

**Considerations:**
- Optimistic UI updates
- Error handling and rollback
- Batch update optimization
- Browser compatibility testing

---

### STORY 5: Delete Task (1 SP)

#### Backend Tasks
```java
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    taskService.deleteTask(id);
    return ResponseEntity.noContent().build();
}
```

#### Frontend Tasks
```jsx
const handleDelete = async (id) => {
  if (window.confirm('Are you sure?')) {
    // DELETE /api/tasks/{id}
    // Remove from local state
  }
};
```

---

### STORY 6: Daily Reset (2 SP)

#### Backend Tasks
```java
@DeleteMapping("/clear")
public ResponseEntity<Void> clearCompletedTasks() {
    taskService.clearCompletedTasks();
    return ResponseEntity.noContent().build();
}

// Service
@Transactional
public void clearCompletedTasks() {
    taskRepository.deleteByCompletedTrue();
    // Or soft delete: mark as archived
}
```

---

### STORY 7: Streak Counter (3 SP)

#### Backend Tasks
```java
// Entity: Streak.java
@Entity
@Table(name = "streaks")
public class Streak {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(nullable = false)
    private Integer currentStreak;
    
    @Column(nullable = false)
    private Integer longestStreak;
}

// Service Logic
public void updateStreak(Long userId) {
    LocalDate today = LocalDate.now();
    Streak streak = findOrCreateStreak(userId, today);
    
    if (isConsecutiveDay(streak)) {
        streak.setCurrentStreak(streak.getCurrentStreak() + 1);
    } else {
        streak.setCurrentStreak(1);
    }
    
    if (streak.getCurrentStreak() > streak.getLongestStreak()) {
        streak.setLongestStreak(streak.getCurrentStreak());
    }
    
    streakRepository.save(streak);
}
```

**Date Logic Considerations:**
- Timezone handling
- Midnight boundary checks
- Daylight saving time adjustments

---

### STORY 8: CSV Export (2 SP)

#### Frontend Tasks
```jsx
const exportToCSV = (tasks) => {
  const headers = ['ID', 'Title', 'Description', 'Priority', 'Completed', 'Created At'];
  const rows = tasks.map(task => [
    task.id,
    task.title,
    task.description,
    task.priority,
    task.completed,
    task.createdAt
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tasks-${new Date().toISOString()}.csv`;
  a.click();
};
```

---

### STORY 9: Authentication (8 SP) 🔒 Security Critical

#### Backend Tasks
```java
// Entity: User.java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String passwordHash; // BCrypt
    
    // Roles, timestamps, etc.
}

// Security Config
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests()
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated();
        return http.build();
    }
}

// JWT Service
@Service
public class JwtService {
    public String generateToken(User user) {
        // JWT generation logic
    }
    
    public boolean validateToken(String token) {
        // Token validation
    }
}
```

#### Frontend Tasks
```jsx
// Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };
  
  // Token refresh logic
  // Auto-logout on token expiry
};
```

**Security Considerations:**
- Password hashing (BCrypt, Argon2)
- JWT expiration and refresh tokens
- HTTPS only in production
- CORS configuration
- Rate limiting on auth endpoints
- Input sanitization

---

### STORY 10: Analytics Dashboard (5 SP)

#### Backend Tasks
```java
// Controller
@GetMapping("/api/analytics/stats")
public ResponseEntity<AnalyticsDTO> getStats(
    @RequestParam(required = false) LocalDate startDate,
    @RequestParam(required = false) LocalDate endDate
) {
    AnalyticsDTO stats = analyticsService.getStats(startDate, endDate);
    return ResponseEntity.ok(stats);
}

// Service
public AnalyticsDTO getStats(LocalDate startDate, LocalDate endDate) {
    return AnalyticsDTO.builder()
        .totalTasks(taskRepository.count())
        .completedTasks(taskRepository.countByCompletedTrue())
        .completionRate(calculateCompletionRate())
        .averageTasksPerDay(calculateAverageTasksPerDay(startDate, endDate))
        .streak(currentStreak)
        .build();
}
```

#### Frontend Tasks
```jsx
// Component: AnalyticsDashboard.jsx
import { Line, Bar, Pie } from 'react-chartjs-2';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  
  useEffect(() => {
    fetchStats();
  }, [dateRange]);
  
  return (
    <div>
      <DateRangePicker onChange={setDateRange} />
      <Line data={completionTrendData} />
      <Bar data={tasksByPriorityData} />
      <Pie data={completionRateData} />
    </div>
  );
};
```

**Performance Considerations:**
- Database indexing on date fields
- Caching for frequently accessed stats
- Pagination for large datasets
- Aggregation queries optimization

---

### STORY 11: Mobile UX (3 SP)

#### Frontend Tasks
```css
/* Responsive Design */
@media (max-width: 768px) {
  .task-list {
    padding: 0.5rem;
  }
  
  .task-item {
    font-size: 0.9rem;
  }
}

/* Touch-friendly targets */
.task-item {
  min-height: 44px; /* iOS recommendation */
  padding: 12px;
}
```

```jsx
// Swipe to delete (using react-swipeable)
import { useSwipeable } from 'react-swipeable';

const TaskItem = ({ task, onDelete }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onDelete(task.id),
    trackMouse: true
  });
  
  return <div {...handlers}>{/* Task content */}</div>;
};
```

**Mobile Considerations:**
- Touch target sizes (min 44x44px)
- Viewport meta tag
- PWA capabilities (optional)
- Offline support (optional)
- Performance on low-end devices

---

## Database Schema

```sql
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority INTEGER NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    user_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE streaks (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    date DATE NOT NULL,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    UNIQUE(user_id, date)
);

CREATE INDEX idx_tasks_user_priority ON tasks(user_id, priority);
CREATE INDEX idx_tasks_user_completed ON tasks(user_id, completed);
CREATE INDEX idx_streaks_user_date ON streaks(user_id, date);
```

---

## Testing Strategy

### Unit Tests
- Service layer business logic
- Utility functions
- Component rendering
- Form validation

### Integration Tests
- API endpoint testing
- Database operations
- Authentication flows
- End-to-end user journeys

### Performance Tests
- Load testing for analytics queries
- Concurrent task operations
- JWT token validation overhead

---

## Deployment Considerations

### Backend
- Environment variables for secrets
- Database connection pooling
- Logging and monitoring
- Health check endpoints

### Frontend
- Environment-specific API URLs
- Build optimization
- CDN for static assets
- Error boundary implementation

---

## Estimated Development Time

| Story | Backend (hours) | Frontend (hours) | QA (hours) | Total |
|-------|----------------|------------------|------------|-------|
| Story 1 | 8 | 6 | 4 | 18 |
| Story 2 | 4 | 6 | 3 | 13 |
| Story 3 | 4 | 4 | 3 | 11 |
| Story 4 | 12 | 16 | 6 | 34 |
| Story 5 | 2 | 3 | 2 | 7 |
| Story 6 | 4 | 3 | 2 | 9 |
| Story 7 | 10 | 4 | 4 | 18 |
| Story 8 | 0 | 4 | 2 | 6 |
| Story 9 | 24 | 12 | 8 | 44 |
| Story 10 | 12 | 10 | 4 | 26 |
| Story 11 | 0 | 12 | 4 | 16 |

**Total Estimated Hours:** ~202 hours (~5 weeks for 1 full-stack dev)
