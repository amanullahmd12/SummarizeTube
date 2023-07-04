$ (document).ready (function () {
  $ ('.lang-trans').hide ();
  $ ('.copy_btn').hide ();

  const checkbox = document.getElementById ('checkbox');
  checkbox.addEventListener ('change', () => {
    document.body.classList.toggle ('dark');
  });

  const copy = document.getElementById ('copy_btn');
  copy.addEventListener ('click', function () {
    var text = document.getElementById ('output').innerHTML;
    navigator.clipboard.writeText (text).then (_ => {
      console.log ('copied');
    });
  });
  const copy_trans = document.getElementById ('copy_btn_trans');
  var text_trans = document.getElementById ('outputTrans').innerHTML;
  copy_trans.addEventListener ('click', function () {
    navigator.clipboard.writeText (text_trans).then (_ => {
      console.log ('copied');
    });
  });
  const btn = document.getElementById ('summarise');
  btn.addEventListener ('click', function () {
    btn.disabled = true;
    $ ('.loader').show ();
    btn.innerHTML = 'Summarising...';
    var url = document.getElementById ('Youtube-Link').value;
    console.log (url);
    var xhr = new XMLHttpRequest ();
    xhr.open ('GET', 'http://127.0.0.1:5000/summary?url=' + url, true);
    xhr.onload = function () {
      var text = xhr.responseText;
      const p = document.getElementById ('output');
      p.innerHTML = text;
      $ ('.copy_btn').show ();
      btn.disabled = false;
      btn.innerHTML = 'Summarise';
      $ ('.lang-trans').show ();
    };
    xhr.send ();
  });

  const trans_btn = document.getElementById ('translate');
  trans_btn.addEventListener ('click', function () {
    trans_btn.disabled = true;
    trans_btn.innerHTML = 'Translating...';

    var language = document.getElementById ('lang').value;
    console.log (language);
    var xml = new XMLHttpRequest ();
    xml.open (
      'GET',
      'http://127.0.0.1:5000/translate?language=' + language,
      true
    );
    xml.onload = function () {
      var text = xml.responseText;
      const p = document.getElementById ('outputTrans');
      p.innerHTML = text;
      $ ('.copy_btn_trans').show ();
      trans_btn.disabled = false;
      trans_btn.innerHTML = 'Translate';
    };
    xml.send ();
  });
});
