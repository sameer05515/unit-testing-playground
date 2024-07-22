If you're using Docker on a Windows machine, the instructions remain largely the same, but here are a few adjustments and details specific to Windows:

### Docker Volumes on Windows
1. **Volume (`oracle-data`)**:
   - The volume will be stored within Docker's filesystem. On Windows, this is usually located in:
     ```
     \\wsl$\docker-desktop-data\version-pack-data\community\docker\volumes
     ```
   - If you prefer to map the volume to a specific directory on your Windows filesystem, update the `docker-compose.yml` like this:
     ```yaml
     volumes:
       - C:\path\to\your\oracle-data:/opt/oracle/oradata
     ```

     Replace `C:\path\to\your\oracle-data` with the path where you want the database data to be stored.

---

### Full Example for Windows
Here’s the updated `docker-compose.yml`:

```yaml
version: '3.8'
services:
  oracle-db:
    image: container-registry.oracle.com/database/enterprise:21.3.0.0
    container_name: oracle-db
    ports:
      - "1521:1521" # Database port
      - "5500:5500" # EM Express port
    environment:
      ORACLE_SID: ORCLCDB          # Container Database name
      ORACLE_PDB: ORCLPDB1         # Pluggable Database name
      ORACLE_PWD: your_password    # Database password
    volumes:
      - C:\docker-volumes\oracle-data:/opt/oracle/oradata # Persist data on Windows
    restart: always
```

---

### Running the Container:
1. Save the `docker-compose.yml` file.
2. Open **Command Prompt** or **PowerShell** and navigate to the directory containing the `docker-compose.yml`.
3. Run:
   ```bash
   docker-compose up -d
   ```
4. To check logs:
   ```bash
   docker-compose logs -f oracle-db
   ```

---

### Notes for Windows:
1. **Shared Drives**:
   - If you're mounting a directory (e.g., `C:\docker-volumes\oracle-data`), ensure your Windows drive is shared with Docker. You can configure this in Docker Desktop under **Settings > Resources > File Sharing**.
   
2. **WSL2 Integration**:
   - If you're using WSL2, you can mount a path from your WSL filesystem directly:
     ```yaml
     volumes:
       - /mnt/c/docker-volumes/oracle-data:/opt/oracle/oradata
     ```

3. **Performance Tip**:
   - Storing volumes within Docker's filesystem (default) is faster than mapping to a Windows path because of the filesystem overhead between Docker and Windows.

Let me know if you face any issues!