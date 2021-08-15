/**
 *
 *  Locate Me
 *
 *  @author Tarun Mandal Ghosh <itarungm@gmail.com>
 *
 *  @file Version: 1.0
 *
 *  @license MIT License
 *
 *  Copyright (c) 2021 Locate Me
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 */

const MAP_ACCESS_TOKEN = 'pk.eyJ1IjoidGFydW4tZGV2IiwiYSI6ImNrc2JvOGV3dDA4bWoydnFrdzJtMmplbGMifQ.0EiBGn1VllGcsjZqrNUGfQ';
const loader = document.querySelector('.center');

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

successLocation=(pos)=>{
    setupMap([pos.coords.longitude, pos.coords.latitude])
    document.querySelector('.mapboxgl-ctrl-logo').remove();
    document.querySelector('.mapboxgl-ctrl-bottom-right').remove();
    loader.classList.add('hide');
}

errorLocation = (err)=>{
    console.error(err)
}

navigator.geolocation.getCurrentPosition(successLocation,errorLocation, {
    enableHighAccuracy: true
}
)



function setupMap(position) {
       const map =  new mapboxgl.Map({
            accessToken: MAP_ACCESS_TOKEN,
            container: 'map',
            style: 'mapbox://styles/mapbox/outdoors-v9',
            center: position,
            zoom: 10
        });

        map.addControl(new mapboxgl.NavigationControl());   
        map.addControl(
            new MapboxDirections({
            accessToken: MAP_ACCESS_TOKEN
            }),
            'top-left'
            ); 

            for (const input of inputs) {
                input.onclick = (layer) => {
                const layerId = layer.target.id;
                map.setStyle('mapbox://styles/mapbox/' + layerId);
                };
                }

}

 



