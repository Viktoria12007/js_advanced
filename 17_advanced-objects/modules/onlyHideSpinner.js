export default function onlyHideSpinner() {
    const spinner = document.getElementById('spinner');
   
    spinner.classList.add('loaded_hiding');
         window.setTimeout(() => {
             spinner.classList.add('loaded');
             spinner.classList.remove('loaded_hiding');
         }, 500);
}