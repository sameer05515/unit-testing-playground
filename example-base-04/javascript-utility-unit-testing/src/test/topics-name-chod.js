const entries = [
    'Docker.md',
    'GraphQL.md',
    'Hibernate.md',
    'Java.md',
    'Javascript.md',
    'Kubernetes.md',
    'ReactJs.md',
    'Rest-Service-Development.md',
    'Spring-Boot-JPA.md',
    'Spring-Boot.md',
    'Team-Coordination.md',
    'Team-Leading.md',
    'Typescript.md'
  ];
  
  const formatEntries = (entries) => {
    return entries.map(entry => {
      const topicName = entry.replace('.md', '').replaceAll('-'," "); // Remove the '.md' part
      return `- [please suggest more focused preparation for ${topicName}](topics/${entry})`; // Format it as per the requirement
    }).join('\n'); // Join the result as a string with new lines
  };
  
  // Call the function and print the result
  console.log(formatEntries(entries));
  