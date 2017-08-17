		let input = document.getElementById('username')


		function getRepositories() {
			const req = new XMLHttpRequest()
			req.addEventListener("load", displayRepositories);
			req.open("GET", 
			`https://api.github.com/users/${input.value}/repos`)
			req.send()
			
		}

		function displayRepositories(event, data) {
		  var repos = JSON.parse(this.responseText)
		  const repoList = `<ul>${repos.map(r => '<li>' + r.html_url + ' - <a href="#" data-repo="' + r.full_name + '" onclick="getCommits(this)">Get Commits</a> </li>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a> </li>').join('')}</ul>`
		  document.getElementById("repositories").innerHTML = repoList
		}


		function getCommits(el) {
		  const repo = el.dataset.repository
	  const req = new XMLHttpRequest()
		  req.addEventListener("load", displayCommits)
	  req.open("GET", `https://api.github.com/repos/${input.value}/${repo}/commits`)
		  req.send()
		}

		function displayCommits() {
		  const commits = JSON.parse(this.responseText)
		  const commitsList = commits.map(commit => `${commit.author.login},${commit.commit.author.name}, ${commit.commit.message}`).join('')
		  document.getElementById("details").innerHTML = commitsList
		}

		function getBranches(el) {
			const repo = el.dataset.repository
			const req = new XMLHttpRequest()
			req.addEventListener("load", displayBranches)
			req.open("GET", `https://api.github.com/repos/${input.value}/${repo}/branches`)
			req.send()
		}			
		
		function displayBranches() {
		  const branches = JSON.parse(this.responseText)
		  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
		  document.getElementById("details").innerHTML = branchesList
		}

//`<ul>${commits.map(commit => '<li>' + commit.commit.message + '</li>').join('')}</ul>`
