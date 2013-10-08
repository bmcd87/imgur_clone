// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
  $(".login-button").on("click", "a", function(event) {
    console.log("here");
    event.preventDefault();
    $(this).parent().toggleClass("show-login");
  });
  $(".signup-button").on("click", "a", function(event) {
    console.log("here");
    event.preventDefault();
    $(this).parent().toggleClass("show-signup");
  });

  var dropbox = document.getElementById("body");
  var dropmask = document.getElementById("dropmask")
  dropmask.addEventListener("dragleave", dragExit, false);
  dropbox.addEventListener("dragover", dragOver, false);
  dropbox.addEventListener("drop", drop, false);
})

function dragExit(event) {
  event.stopPropagation();
  event.preventDefault();
  $(".droppable").removeClass("showing");
  $("#dropmask").removeClass("showing");
}
function dragOver(event) {
  event.stopPropagation();
  event.preventDefault();
  if (!$(".droppable").hasClass("showing")) {
    $(".droppable").addClass("showing")
    $("#dropmask").addClass("showing")
  }
}
function drop(event) {
  event.stopPropagation();
  event.preventDefault();

  $(".droppable div p").html("Uploading image...");

  var files = event.dataTransfer.files;

  if (files.length == 1) {
    handleFiles(files);
  }
}

function handleFiles(files) {
  var file = files[0];
  uploadFile(file);
}

function uploadFile(file) {
  var formData = new FormData();
  formData.append("image", file);
  formData.append("dropped", true);
  console.log(formData)
  $.ajax({
    url: '/images',
    data: formData,
    dataType: "json",
    processData: false,
    contentType: false,
    type: "POST",
    success: function(data) {
      window.location = "/images/" + data["id"] + "";
    }
  })
}
