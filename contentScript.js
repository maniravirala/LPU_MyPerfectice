chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  let ansKey;
  if (message.msg === "Sending Data") {
    ansKey = message.keys;
    if (ansKey == 0) {
      console.log("A");
    } else if (ansKey == 1) {
      console.log("B");
    } else if (ansKey == 2) {
      console.log("C");
    } else if (ansKey == 3) {
      console.log("D");
    }

    // var btns = document.querySelector('.ml-auto.text-right');
    // var aSelect = document.createElement('a');
    // aSelect.className = 'btn btn-success';
    // aSelect.innerHTML = 'Select';
    // btns.appendChild(aSelect);

    // console.log(btns);

    // var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // checkboxes[ansKey].click();
    // console.log(checkboxes[ansKey]);

    // Timeout for 2 seconds
    setTimeout(function () {
      const answerElement = document.querySelector(
        `#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.adaptive-question-box.bg-white.p-1.ng-star-inserted > div:nth-child(2) > mcq-question > div > div.question-answers.mb-0 > div:nth-child(${
          ansKey + 1
        }) > div > label`
      );

      if (answerElement) {
        answerElement.click();
        console.log("Clicked");
      }

      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      if (checkboxes[ansKey]) {
        checkboxes[ansKey].checked = true;

        // var a = document.querySelector(".question-answers.mb-0");
        // if (a) {
        //   var b = a.querySelectorAll(".ng-star-inserted");

        //   if (b) {
        //     var element = b[ansKey];

        //     if (element.classList && element.classList.add) {
        //       element.classList.add("answered");
        //       console.log(element);
        //     } else {
        //       console.error("Element does not have classList or add method");
        //     }
        //   } else {
        //     console.error("Not enough elements with class 'ng-star-inserted'");
        //   }
        // } else {
        //   console.error("Element with class 'question-answers.mb-0' not found");
        // }

        console.log("Checkbox Clicked");
      }

      const pageWrapper = document.querySelector("#page-wrapper");
      const saveAndNextButton = pageWrapper.querySelector(
        "#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.row.ng-star-inserted > div.col-lg-4.text-right > div > div > a.btn.btn-primary"
      );

      if (saveAndNextButton) {
        saveAndNextButton.click();
      }
    }, 2000);

    setTimeout(() => {
      const nextBtn = document.querySelector(
        "#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.d-block.d-lg-none.fixed-bottom.ng-star-inserted > div.no-gutters > div:nth-child(2) > a.btn.btn-primary"
      );

      if (!nextBtn) {
        document
          .querySelector(
            "#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.d-block.d-lg-none.fixed-bottom.ng-star-inserted > div.no-gutters > div:nth-child(1) > a.btn.btn-primary"
          )
          .click();
      } else {
        nextBtn.click();
      }
    }, 200);
  }

  if (message.msg === "start") {
    chrome.runtime.sendMessage({ msg: "startPanel" });
  }
});
