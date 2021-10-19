export default function onlyHideSpinner() {
    const spinner = document.getElementById('spinner');
    // this.spinnerElement = spinner;
    //  if (this.showLoader) {
    //      console.log('dwdwd');

    // window.setTimeout(() => {
    //     spinner.classList.add('loaded_hiding');
    //     //  if (action === 'create') {
    //     //  this.appendElement(currentElement);
    //     //  }
    //  }, 500);
    spinner.classList.add('loaded_hiding');
         window.setTimeout(() => {
            // spinner.classList.add('loaded_hiding');
             spinner.classList.add('loaded');
             spinner.classList.remove('loaded_hiding');
            //  if (action === 'create') {
            //  parentElement(currentElement);
            //  }
         }, 500);
}