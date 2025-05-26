(function () {
  const form = getForm();
  const errorMessages = getErrorMessages();

  function onChangeInvalid(e) {
    this.setCustomValidity("");

    if (!this.value) {
      this.setCustomValidity(errorMessages.required);
    }
    else if (this.type === "email" && this.validity.typeMismatch) {
      this.setCustomValidity(errorMessages.email);
    }
  }

  $(".modal").on("hidden.bs.modal", function () {
    var video = $(this).find("video").get(0);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });

  for (const field in form) {
    const $element = form[field];
    $element.on("change invalid", onChangeInvalid);
  }

  function getForm() {
    return {
      name: $("[name=name]"),
      email: $("[name=email]"),
      phone: $("[name=phone]"),
      message: $("[name=message]"),
    };
  }

  function getErrorMessages() {
    return {
      required: "This field is required.",
      email: "Enter a valid email address."
    };
  };
})();
