## PopStats Dataviz
Interactive data-visualisation for popstats.unhcr.org<br/><br/>
![thumbnail.jpg](https://raw.githubusercontent.com/unhcr/PopStats-Dataviz/master/app/images/thumbnail.jpg?token=ADCetdkw-t-vIT4f-uBdo-sqw0TGueFOks5WXXQJwA%3D%3D)

***

**To install and serve locally**<br/><br/>
1. `npm install`<br/>
2. `bower install`<br/>
3. `grunt serve`<br/>



***

**To build and deploy**<br/><br/>
`grunt build` packages the application into the dist folder

***
**To embed the visualisation in other pages**<br/><br/>
```<iframe id="unhcr_popstats_embed" style="border: none" src="http://data.unhcr.org/popstats/index.html" width="100%" onload='javascript:iframeResize();'></iframe>
<script>window.onresize = function(){
    iframeResize();}; function iframeResize(){ var iw = $('#unhcr_popstats_embed').width();
    $('#unhcr_popstats_embed').height(iw/1.415);}; 
</script>```
