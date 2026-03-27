fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        document.title = `${data.name} - Resume`;
        document.getElementById("name").textContent = data.name;
        document.getElementById("title").textContent = data.title;
        document.getElementById("contact").textContent =
            `${data.location} | ${data.phone} | ${data.email}`;
        document.getElementById("links").innerHTML = `
      <a href="${data.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
      <span class="dot"></span>
      <a href="${data.github}" target="_blank" rel="noreferrer">GitHub</a>
    `;
        document.getElementById("summary").innerHTML = data.summary;

        const experienceContainer = document.getElementById("experience");
        data.experience.forEach((job) => {
            const jobDiv = document.createElement("div");
            jobDiv.className = "entry-card";
            if (job.roles?.length) {
                jobDiv.classList.add("experience-group");
                jobDiv.innerHTML = `
        <h3>${job.company}</h3>
        <p class="entry-subtitle">${job.companySubtitle || ""}</p>
        <p class="date">${job.date}</p>
        <div class="role-list">
          ${job.roles
              .map(
                  (role) => `
            <div class="role-entry">
              <h4>${role.title}</h4>
              <p class="date">${role.date}</p>
              <ul>${role.tasks.map((task) => `<li>${task}</li>`).join("")}</ul>
            </div>
          `,
              )
              .join("")}
        </div>
      `;
            } else {
                jobDiv.innerHTML = `
        <h3>${job.title}</h3>
        <p class="entry-subtitle">${job.company}</p>
        <p class="date">${job.date}</p>
        <ul>${job.tasks.map((task) => `<li>${task}</li>`).join("")}</ul>
      `;
            }
            experienceContainer.appendChild(jobDiv);
        });

        const educationContainer = document.getElementById("education");
        data.education.forEach((edu) => {
            const eduDiv = document.createElement("div");
            eduDiv.className = "entry-card compact";
            eduDiv.innerHTML = `
        <h3>${edu.degree}</h3>
        <p class="entry-subtitle">${edu.field}</p>
        <p class="entry-subtitle muted">${edu.institution}</p>
        <p class="date">${edu.date}</p>
      `;
            educationContainer.appendChild(eduDiv);
        });

        const skillsContainer = document.getElementById("skills");
        data.skills.forEach((skill) => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsContainer.appendChild(li);
        });

        const certificationsContainer = document.getElementById(
            "certifications",
        );
        data.certifications.forEach((cert) => {
            const li = document.createElement("li");
            li.textContent =
                `${cert.name} - ${cert.institution} (${cert.date})`;
            certificationsContainer.appendChild(li);
        });

        document.getElementById("languages").innerHTML = data.languages
            .map((language) => `<span class="pill">${language}</span>`)
            .join("");

        const volunteeringContainer = document.getElementById("volunteering");
        data.volunteering.forEach((volunteer) => {
            const div = document.createElement("div");
            div.className = "entry-card compact";
            div.innerHTML = `
    <h3>${volunteer.role}</h3>
    <p class="entry-subtitle">${volunteer.organization}</p>
    <p class="date">${volunteer.date}</p>
    <p>${volunteer.description}</p>
  `;
            volunteeringContainer.appendChild(div);
        });

        const opensourceContainer = document.getElementById("opensource");
        data.opensource.forEach((contribution) => {
            const div = document.createElement("div");
            div.className = "entry-card compact";
            div.innerHTML = `
    <h3>${contribution.project}</h3>
    <p>${contribution.description}</p>
    <p><a href="${contribution.link}" target="_blank" rel="noreferrer">View Contribution</a></p>
  `;
            opensourceContainer.appendChild(div);
        });

        document.getElementById("footer").textContent = `© ${
            new Date().getFullYear()
        } - ${data.name}`;
    })
    .catch((error) => console.error("Error loading the data:", error));
