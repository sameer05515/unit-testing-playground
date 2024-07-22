const fs = require("fs");
const path = require("path");

const folder_names = [
    //   "maha-nahagan-part-2-rakt-parv",
    //   "maha-nahagan-part-1-avataran-parv",
    //   "kabad-nagar",
    //   "balcharit-1",
    //   "balcharit-2",
    //   "balcharit-3",
    //   "balcharit-4",
    //   "balcharit-5",
    //   "balcharit-6",
    //   "hawaldar-bahadur-mental-town",
    //   "aatank",
    //   "superman-scd",
    //   "vrishchika-hatyakand",
    //   "makabara-scd-nagraj",
    //   "crookbond-jaasoos-ka-hatyara",
    //   "hawaldar-bahadur-baccho-ke-chor",
    //   "scd-mumy-ka-kahar",
    //   "crookbond-sabhi-deewane-jooton-ke",
    // "fighter-toads-karorepati",
    // "fighter-toads-pradooshan-bhai",
    // "crookbond-hatyara-sasur",
    // "crookbond-soonahara-jaal",
    // "crookbond-daaku-tabbarsingh",
    // "fighter-toads-Hatyakshari",
    // "crookbond-maut-ki-putli-ka-ant",
    // "crookbond-putli-ka-jaljala",
    // "crookbond-lohe-ki-putli",
    // "crookbond-pati-ki-talaash",
    // "crookbond-bhaarat-ki-beti",
    // "crookbond-pralayankari-jingaaru",
    // "crookbond-ka-apaharan",
    // "hawaldar-bahadur-teen-tilangey",
    // "hawaldar-bahadur-andhey-ke-hath-bater",
    // "parmaanu-neem-hakeem",
    // "fighter-toads-toad-fod",
    // "raj-comics-multi-starer-kohram",
    // "raj-comics-multi-starer-parkaley"
    // "raj-comics-multi-starer-vidhwansh",
    // "crookbond-bhikh-do-dua-lo",
    // "fighter-toads-jaali-note",
    // "fighter-toads-champion",
    // "hawaldar-bahadur-kaal-bharucha",
    // "crookbond-swarg-ke-shaitaan",
    // "scd-gupt",
    // "crookbond-jhujhjhudda",
    // "hawaldar-bahadur-chah-sherniyaan",
    // "fighter-toads-mooshakraaj",
    // "hawaldar-bahadur-nau-ajoobey",
    // "hawaldar-bahadur-sath-lakh-ka-bakra",
    // "crookbond-jhojhatek",
    // "crookbond-adrishya-shaitaan",
    // "crookbond-mera-joota-tera-sar",
    // "crookbond-kaampti-dharti-ke-log",
    // "crookbond-soney-ka-sikka",
    // "crookbond-ram-naam-satt-hai",
    // "crookbond-maut-ka-baadshah",
    // "hawaldar-bahadur-aur-jal-jiwda",
    // "hawaldar-bahadur-james-bond-ka-baap",
    // "fighter-toads",
    // "scd-super-commando-dhruv",
    // "hawaldar-bahadur-aur-lal-coat-ka-hungama",
    // "crookbond-aur-kuber-ka-heera",
    // "crookbond-aur-moordon-ke-bich-mein",
    // "fighter-toads-aur-khoon-chor",
    // "scd-Robot",
    // "crookbond-aur-super-car",
    // "crookbond-aur-sone-ka-saand",
    // "scd-nagraj-01-drakula-ka-hamla",
    // "scd-nagraj-02-nagraj-aur-drakula",
    // "scd-nagraj-03-drakula-ka-ant",
    // "scd-nagraj-04-kolahal",
    // "hawaldar-bahadur-aur-kubda-pret",
    // "raj-comics-multi-starer-zalzala",
    // "raj-comics-multi-starer-nishachar",
    
];

const comic_folder_and_file_name = folder_names[folder_names.length - 1];

const WATCH_DIRECTORY =
    "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\watch-directory";
const OUTPUT_DIRECTORY = `D:\\Prem\\comic-images\\${comic_folder_and_file_name}`;

// Input folder configurations
const outputFolderNames = folder_names.map((folderName) => ({
    inputFolder: path.join("D:\\Prem\\comic-images", folderName),
    outputFolder: "D:\\Prem\\comics",
    outputFileName: `${folderName}.pdf`,
}));

module.exports = {
    WATCH_DIRECTORY,
    OUTPUT_DIRECTORY,
    outputFolderNames,
};
