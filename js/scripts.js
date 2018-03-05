(function() {
  const $html = $("html");
  const $flags = $(".flag");
  const $navbar = $(".navbar-collapse");

  const form = getForm();
  const errorMessages = getErrorMessages();

  function changeLanguage(lang) {
    $html.attr("lang", lang);
    $flags.removeClass("active");
    $flags.filter(".flag-" + lang).addClass("active");

    for (const field in form) {
      const element = form[field].$element.get(0);
      element.placeholder = form[field].placeholder[lang];
    }
  }

  function onChangeInvalid(e) {
    const lang = $html.attr("lang");
    this.setCustomValidity("");

    if (!this.value) {
      this.setCustomValidity(errorMessages[lang].required);
    }
    else if (this.type === "email" && this.validity.typeMismatch) {
      this.setCustomValidity(errorMessages[lang].email);
    }
  }

  $(document).ready(function() {
    changeLanguage("en");
  });

  $flags.click(function(e) {
    const lang = $(this).data("lang");
    changeLanguage(lang);
    $navbar.collapse("hide");
  });

  $(".modal").on("hidden.bs.modal", function() {
    var video = $(this).find("video").get(0);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });

  for (const field in form) {
    const $element = form[field].$element;
    $element.on("change invalid", onChangeInvalid);
  }

  function getForm() {
    return {
      name: {
        $element: $("[name=name]"),
        placeholder: {
          en: "Name",
          es: "Nombre"
        }
      },
      email: {
        $element: $("[name=email]"),
        placeholder: {
          en: "Email address",
          es: "Correo electrónico"
        }
      },
      phone: {
        $element: $("[name=phone]"),
        placeholder: {
          en: "Phone number (optional)",
          es: "Teléfono (opcional)"
        }
      },
      message: {
        $element: $("[name=message]"),
        placeholder: {
          en: "Message",
          es: "Mensaje"
        }
      }
    };
  }

  function getErrorMessages() {
    return {
      en: {
        required: "This field is required.",
        email: "Enter a valid email address."
      },
      es: {
        required: "Rellene este campo.",
        email: "Introduzca una dirección de correo."
      }
    };
  };
})();
