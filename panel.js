// document.getElementById("text").value

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  if (
    request.request.url ===
    "https://api-ng2.myperfectice.com/api/v1/learningTest/getQuestion"
  ) {
    request.getContent(function (content, encoding) {
      var myobj = JSON.parse(content);
      console.log(myobj.answers);

      var correctAnswers = myobj.answers.filter(function (item) {
        return item.isCorrectAnswer === true;
      });

      var answerText = correctAnswers[0].answerText; // Assuming there's only one object in the array
      var textContent = answerText.replace(/<\/?p>/g, ""); // Remove <p> tags
      console.log(textContent);

      let i = findCorrectAns(myobj.answers);

      // document.getElementById("text").value = JSON.stringify(myobj.answers);
      // document.getElementById("text").value = JSON.stringify(
      //   textContent.trim()
      // );


      if (i != -1) {
        if (i == 0) {
          document.getElementById("text").value = "A";
        } else if (i == 1) {
          document.getElementById("text").value = "B";
        } else if (i == 2) {
          document.getElementById("text").value = "C";
        } else if (i == 3) {
          document.getElementById("text").value = "D";
        }

        const selectButton = document.querySelector("#select");
        const submitButton = document.querySelector("#submit");

        selectButton.addEventListener("click", function () {
          const answerElement = document.querySelector(
            `#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.adaptive-question-box.bg-white.p-1.ng-star-inserted > div:nth-child(2) > mcq-question > div > div.question-answers.mb-0 > div:nth-child(${i + 1}) > div > label`
          );
          console.log(i);
    
          if (answerElement) {
            answerElement.click();
            console.log("Clicked");
          }
        });
        
        submitButton.addEventListener("click", function () {
          console.log("Submit Button Clicked");
        });

        console.log("Correct Answer is: " + i);
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            //Sending message to the active tab
            chrome.tabs.sendMessage(activeTab.id, {
              msg: "Sending Data",
              keys: i,
            });
          }
        );
      }
    });
  } else if (
    request.request.url.startsWith(
      "https://api-ng2.myperfectice.com/api/v1/learningTest/getPracticeSet/"
    )
  ) {
    request.getContent(function (content, encoding) {
      var myobj = JSON.parse(content);
      // console.log(myobj.answers);
      var ans = myobj.question;
      console.log(ans.answers);

      // var correctAnswers = ans.answers.filter(function (item) {
      //   return item.isCorrectAnswer === true;
      // });

      if (ans && ans.answers && Array.isArray(ans.answers)) {
        var correctAnswers = ans.answers.filter(function (item) {
          return item.isCorrectAnswer === true;
        });

        console.log(correctAnswers);
      } else {
        console.log("Invalid or missing answers array in the response.");
      }

      var answerText = correctAnswers[0].answerText; // Assuming there's only one object in the array
      var textContent = answerText.replace(/<\/?p>/g, ""); // Remove <p> tags
      console.log(textContent);

      // document.getElementById("text").value = JSON.stringify(myobj.answers);
      document.getElementById("text").value = JSON.stringify(
        textContent.trim()
      );
      //Finding the correct Answere
      let i = findCorrectAns(myobj.answers);
      if (i != -1) {
        console.log("Correct Answer is: " + i);
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            //Sending message to the active tab
            chrome.tabs.sendMessage(activeTab.id, {
              msg: "Sending Data",
              keys: i,
            });
          }
        );
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.msg == "startPanel") {
    console.log("now I will get started in the Panel!");
    chrome.devtools.network.onRequestFinished.addListener(function (request) {
      request.getContent(function (content, encoding) {
        if (isJsonString(content)) {
          var myobj = JSON.parse(content);
          console.log(myobj.question);
          if (myobj.question) {
            let i = findCorrectAns(myobj.question.answers);
            console.log("Correct Answer is: " + i);
            chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs) {
                var activeTab = tabs[0];
                //Sending message to the active tab
                chrome.tabs.sendMessage(activeTab.id, {
                  msg: "Sending Data",
                  keys: i,
                });
              }
            );
          }
        }
      });
    });
  }
});

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function findCorrectAns(answers) {
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].isCorrectAnswer) {
      return i;
    }
  }
  return -1;
}
