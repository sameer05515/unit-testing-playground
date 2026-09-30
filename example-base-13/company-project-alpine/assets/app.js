function app() {
  return {
    loading: true,
    error: "",
    companies: [],
    projects: [],
    projectDetails: [],

    tab: "overview",

    companySearch: "",
    projectSearch: "",
    projectStatus: "",
    projectCompany: "",

    companyModal: false,
    projectModal: false,

    selectedCompany: null,
    selectedProject: null,

    async loadData() {
      try {
        const response = await fetch("./data/data.json");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        this.companies = data.companies || [];
        this.projects = data.projects || [];
        this.projectDetails = data.projectDetails || [];
      } catch (error) {
        console.error(error);
        this.error = "Could not read data/data.json. Start a local HTTP server and open index.html through http://localhost.";
      } finally {
        this.loading = false;
      }
    },

    countStatus(status) {
      return this.projects.filter(project => project.status === status).length;
    },

    statusSummary() {
      const statuses = ["PLANNED", "IN_PROGRESS", "COMPLETED", "ON_HOLD"];

      return statuses.map(status => {
        const count = this.countStatus(status);
        return {
          status,
          count,
          percent: this.projects.length ? Math.round((count / this.projects.length) * 100) : 0
        };
      });
    },

    filteredCompanies() {
      const query = this.companySearch.trim().toLowerCase();

      if (!query) {
        return this.companies;
      }

      return this.companies.filter(company =>
        [
          company.name,
          company.industry,
          company.location
        ].some(value => (value || "").toLowerCase().includes(query))
      );
    },

    filteredProjects() {
      const query = this.projectSearch.trim().toLowerCase();

      return this.projects.filter(project => {
        const matchesSearch =
          !query ||
          [
            project.name,
            project.description,
            this.companyName(project.companyId)
          ].some(value => (value || "").toLowerCase().includes(query));

        const matchesStatus =
          !this.projectStatus || project.status === this.projectStatus;

        const matchesCompany =
          !this.projectCompany || project.companyId === this.projectCompany;

        return matchesSearch && matchesStatus && matchesCompany;
      });
    },

    companyProjects(companyId) {
      return this.projects.filter(project => project.companyId === companyId);
    },

    companyProjectCount(companyId) {
      return this.companyProjects(companyId).length;
    },

    companyName(companyId) {
      const company = this.companies.find(item => item.id === companyId);
      return company ? company.name.trim() : "Unknown Company";
    },

    projectName(projectId) {
      const project = this.projects.find(item => item.id === projectId);
      return project ? project.name : "Unknown Project";
    },

    projectDetailsFor(projectId) {
      return this.projectDetails.filter(detail => detail.projectId === projectId);
    },

    projectDetailCount(projectId) {
      return this.projectDetailsFor(projectId).length;
    },

    formatStatus(status) {
      return (status || "")
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
    },

    statusClass(status) {
      return {
        PLANNED: "bg-blue-50 text-blue-700",
        IN_PROGRESS: "bg-amber-50 text-amber-700",
        COMPLETED: "bg-emerald-50 text-emerald-700",
        ON_HOLD: "bg-red-50 text-red-700"
      }[status] || "bg-slate-100 text-slate-600";
    },

    statusBarClass(status) {
      return {
        PLANNED: "bg-blue-500",
        IN_PROGRESS: "bg-amber-500",
        COMPLETED: "bg-emerald-500",
        ON_HOLD: "bg-red-500"
      }[status] || "bg-slate-400";
    },

    formatCurrency(value) {
      const amount = Number(value || 0);

      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(amount);
    },

    openCompany(company) {
      this.selectedCompany = company;
      this.companyModal = true;
    },

    openProject(project) {
      this.selectedProject = project;
      this.projectModal = true;
      this.companyModal = false;
    }
  };
}