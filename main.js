function fetchIssues () {
     const issues = JSON.parse(localStorage.getItem('issues'));
     const issuesList = document.getElementById('issuesList');
     
     issuesList.innerHTML = '';
     
     for (var i = 0; i < issues.length; i++) {
          let id = issues[i].id;
          let desc = issues[i].description;
          let severity = issues[i].severity;
          let assignedTo = issues[i].assignedTo;
          let status = issues[i].status;

          issuesList.innerHTML +=  '<div class="well">'+
                                   '<h6>Issue ID: ' + id + '</h6>'+
                                   '<p><span class="label label-info">' + status + '</span></p>'+
                                   '<h3>' + desc + '</h3>'+
                                   '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                                   '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                   '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                   '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                   '</div>';
     }
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
     const issueId = chance.guid();
     const issueDesc = document.getElementById('issueDescInput').value;
     const issueSeverity = document.getElementById('issueSeverityInput').value;
     const issueAssignedTo = document.getElementById('issueAssignedToInput').value;
     const issueStatus = 'Open';
     const issue = {
          id: issueId,
          description: issueDesc,
          severity: issueSeverity,
          assignedTo: issueAssignedTo,
          status: issueStatus
     }
     
     if (localStorage.getItem('issues') === null) {
          let issues = [];
          issues.push(issue);
          localStorage.setItem('issues', JSON.stringify(issues));
     } else {
          let issues = JSON.parse(localStorage.getItem('issues'));
          issues.push(issue);
          localStorage.setItem('issues', JSON.stringify(issues));
     }
     
     document.getElementById('issueInputForm').reset();

     fetchIssues();
     
     e.preventDefault(); 
}

function setStatusClosed (id) {
     const issues = JSON.parse(localStorage.getItem('issues'));
     
     for(var i = 0; i < issues.length; i++) {
          if (issues[i].id == id) {
               issues[i].status = "Closed";
          }
     }

     localStorage.setItem('issues', JSON.stringify(issues));
     
     fetchIssues();
}

function deleteIssue (id) {
     const issues = JSON.parse(localStorage.getItem('issues'));
     
     for(var i = 0; i < issues.length; i++) {
          if (issues[i].id == id) {
          issues.splice(i, 1);
          }
     }

     localStorage.setItem('issues', JSON.stringify(issues));
     
     fetchIssues();
}