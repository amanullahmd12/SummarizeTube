// $ (document).ready (function () {
//   // Init
//   $ ('.image-section').hide ();
//   $ ('.loader').hide ();
//   $ ('#result').hide ();

//   // Upload Preview
//   function readURL (input) {
//     if (input.files && input.files[0]) {
//       var reader = new FileReader ();
//       reader.onload = function (e) {
//         $ ('#imagePreview').css (
//           'background-image',
//           'url(' + e.target.result + ')'
//         );
//         $ ('#imagePreview').hide ();
//         $ ('#imagePreview').fadeIn (650);
//       };
//       reader.readAsDataURL (input.files[0]);
//     }
//   }

//   $ ('#imageUpload').change (function () {
//     $ ('.image-section').show ();
//     $ ('#btn-predict').show ();
//     $ ('#result').text ('');
//     $ ('#result').hide ();
//     readURL (this);
//   });

//   // Predict
//   $ ('#btn-predict').click (function () {
//     var form_data = new FormData ($ ('#upload-file')[0]);

//     // Show loading animation
//     $ (this).hide ();
//     $ ('.loader').show ();

//     $.ajax ({
//       type: 'POST',
//       url: '/predict',
//       data: form_data,
//       contentType: false,
//       cache: false,
//       processData: false,
//       async: true,
//       success: function (data) {
//         // Get and display the result
//         $ ('.loader').hide ();
//         $ ('#result').fadeIn (600);
//         $ ('#result').text (' Condition of Crack :  ' + data);
//         console.log ('Success!');
//       },
//     });
//   });
// });

const btn = document.getElementById ('summarise');
btn.addEventListener ('click', function () {
  btn.disabled = true;
  btn.innerHTML = 'Summarising...';
  var url = document.getElementById ('Youtube-Link').value;
  console.log (url);
  var xhr = new XMLHttpRequest ();
  xhr.open ('GET', 'http://127.0.0.1:5000/summary?url=' + url, true);
  xhr.onload = function () {
    var text = xhr.responseText;
    const p = document.getElementById ('output');
    p.innerHTML = text;
    btn.disabled = false;
    btn.innerHTML = 'Summarise';
  };
  xhr.send ();
});

// $ (document).ready (function () {
//   $ ('.check').hide ();
//   function callValue () {
//     var link = document.getElementById ('Youtube-Link').value;
//     console.log (link);
//   }
// });
