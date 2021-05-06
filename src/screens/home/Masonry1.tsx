import React, { useEffect,useState } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  'https://i.pinimg.com/originals/0e/9e/88/0e9e8812f01f82650833264673bf51ed.jpg',
  'https://wallpaperaccess.com/full/7281.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/71Tq9OsjO7L._SY879_.jpg',
  'https://free4kwallpapers.com/uploads/originals/2019/07/14/ultra-hd-ocean-s-wallpaper.jpg',
  'https://cdn.wallpapersafari.com/24/3/ZlgUc6.jpg',
  'https://wallpaperplay.com/walls/full/b/5/e/159585.jpg',
  'https://pixelz.cc/wp-content/uploads/2016/11/windows-10-uhd-4k-wallpaper.jpg',
  'https://cosmos-production-assets.s3.amazonaws.com/file/spina/photo/6597/180716_fluorescent_P.jpg',
  'https://c.gitcoin.co/grants/4e0e1e6de351af46fe9482b35840d3bd/logo.png',
  'https://www.dayglo.com/media/1212/bokeh-3249883_1280.png',
  'https://images-na.ssl-images-amazon.com/images/I/81wajOO6mLL._SX355_.jpg',
  'https://bitesizebio.com/wp-content/uploads/2014/03/dots-and-probes.jpg',
].map((url, id) => ({ id, url }));

const processImages = async images => {
  const processedImages = [...images];
  for (const i in images) {
    const image = processedImages[i];
    await Image.getSize(image.url, (width, height) => {
      processedImages[i] = { ...image, width, height };
    });
  }
  return processedImages;
}

const renderItem = ({ url }, ht, wd, imageSpacing) => (
  <Image
    source={{ uri: url }}
    style={{ width: wd, height: ht, marginBottom: imageSpacing }}
    resizeMode="contain"
  />
);

function App({ columns = 2 }) {
  const COLUMN_WIDTH = width / columns;
  const IMAGE_SPACING = COLUMN_WIDTH * 0.01; 
  const COL_WIDTH = COLUMN_WIDTH - (IMAGE_SPACING / 2);

  const [cols, setCols] = useState(Array(columns).fill(columns).map(_ => ({ bricks: [], colHeight: 0 })));

  const layoutBricks = (images) => {
    const newCols = [...cols];

    images.forEach((image) => {
      let wd = COL_WIDTH;
      const widthReductionFactor = COL_WIDTH / image.width;
      const ht = image.height * widthReductionFactor;
      const currentImage = renderItem(image, ht, wd, IMAGE_SPACING);

      const heightsArray = newCols.map(({ colHeight }) => colHeight);
      const shortestColumnIndex = heightsArray.findIndex(colHt => colHt === Math.min.apply(Math, heightsArray));
      const shortestColumn = newCols[shortestColumnIndex];

      newCols[shortestColumnIndex] = { bricks: [...shortestColumn.bricks, currentImage], colHeight: shortestColumn.colHeight + ht };
    });

    setCols(newCols);
  }

  const layout = async () => {
    const processedImages = await processImages(images);
    layoutBricks(processedImages);
  }

  useEffect(() => { layout() }, []);

  return (
    <>
      <StatusBar hidden />
      <ScrollView
        style={{ flex: 1 }}
        removeClippedSubviews
      >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          {cols.map(({ bricks }) => (
            <View>
              {bricks}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

export default App;