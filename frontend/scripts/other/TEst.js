export default function TEst(text) {

  $('main')
    .append($('<div>', {
        class: 'TEstdiv'
      })
      .text(text));
}
