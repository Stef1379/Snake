window.onload = function() {
    showBanners();
};

myBanners = [['Stichting \'t Oetske.png', 'https://showploegske.jouwweb.nl/'], ['taxibedrijfvdloo.png', 'https://taxibedrijfvdloo.jouwweb.nl/']];
bannerIndex = 0;

let banner = document.querySelector(".banner");

function showBanners() { 
    if (document.images) {
        banner.removeEventListener("click", openBannerUrl);
        bannerIndex++;

        if (bannerIndex == myBanners.length) {
            bannerIndex = 0;
        }

        banner.src = "./banners/" + myBanners[bannerIndex][0];
        banner.addEventListener("click", openBannerUrl);

        setTimeout("showBanners()", 5000);
    }
}

function openBannerUrl() {
    window.open(myBanners[bannerIndex][1]);
}