import React, {useEffect,useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  View,
  ImageSourcePropType,
  FlatList,
  StyleSheet
} from 'react-native';
import Animated,{
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {images} from './Data';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const { height, width } = Dimensions.get('window');

/**
 * De_clutter this file;
 * add navigation stack
 * h3 activation
 * videos
 * music
 * tabbar useSharedValue(y) to hide
 * 
 */
const COLUMN_WIDTH = width / 3;
const IMAGE_SPACING = COLUMN_WIDTH * 0.01;
const BLOCK_WIDTH = COLUMN_WIDTH - (IMAGE_SPACING / 2); // W1

// dimensionConstants
const W3 = 'W3'; // wide => 2w lengthwise & 1w {video}
const W1 = 'W1'; // square {music}
const H3 = 'H3'; // 3w lengthwise & 2w {picture or blog}
const H2 = 'H2'; // 2w lengthwise & 2w {picture or blog}

type imagesType = {
  url:string | ImageSourcePropType ;
  avatar: NodeRequire | string;
  id: string;
};
interface image {
  id:number;
  url:string|number;
}

const processImages = async (images: imagesType[]) => {
  const processedImages = [...images];
  for (const i in images) {
  const image = processedImages[i];

    const whRatioScreen = width / height;
    const w3Threshold = whRatioScreen * 3;
    const h2Threshold = whRatioScreen * 2;
    const h3Threshold = whRatioScreen;

    if(typeof image.url === "string"){
       await Image.getSize(image.url, (wd, ht) => {
      
        const whRatio = wd / ht;
  
        let dimension = 'W1';
        if (whRatio > w3Threshold) dimension = 'W3';
        else if (whRatio < h3Threshold) dimension = 'H3';
        else if (whRatio < h2Threshold) dimension = 'H2';
    
        // @ts-ignore
        processedImages[i] = { ...image, width: wd, height: ht, dimension,id: image.id};
      },(error)=>(console.log("error =" + error)));
      } 
      else if (typeof image.url !== "string"){
        const size = Image.resolveAssetSource(image.url)

        const whRatio = size.width / size.height;
  
        let dimension = 'W1';
        if (whRatio > w3Threshold) dimension = 'W3';
        else if (whRatio < h3Threshold) dimension = 'H3';
        else if (whRatio < h2Threshold) dimension = 'H2';
    
        //@ts-ignore
        processedImages[i] = { ...image, width: size.width, height: size.height, dimension,id:image.id };
      }else{console.log("culprit for image", image.url)}
    
  }
  return processedImages;
}

const renderItem = ({ url,id }: image, ht: number, wd: number, imageSpacing = 0) => {
  typeof url === "string" ? 
    (<Image
    key={`h-${id}`}
    source={ {uri:url}}
    style={{ width: wd, height: ht, marginBottom: imageSpacing }}
    resizeMode="cover"
  />):(<Image
    key={`g-${id}`}
    source={url}
    style={{ width: wd, height: ht, marginBottom: imageSpacing }}
    resizeMode="cover"
  />)
};


function Masonry() {
  const [rows, setRows] = useState<any>([]);
  
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value } }) => {
      y.value = value;
    },
  });

  const layoutBricks = (images: any[]) => {
    const { w1Array, blocksArray } = images.reduce((acc, cur) => {
      const out = { ...acc };
      if (cur.dimension === W1) out.w1Array = [...out.w1Array, cur];
      else out.blocksArray = [...out.blocksArray, cur];
      return out;
    }, { w1Array: [], blocksArray: [] });
    //@ts-ignore
    const blockRows = blocksArray.map((image) => {
      if (image.dimension === W3) {
        const widthReductionFactor = width / image.width;
        const ht = image.height * widthReductionFactor;
        return renderItem(image, ht, width);
      }

      const maybeInterchange = Math.random() > 0.5;

	  if (image.dimension === H2) {
        if (w1Array.length >= 2) {
          const w1Element1 = w1Array.pop();
          const w1Element2 = w1Array.pop();
          
          const elements = [
            renderItem(image, BLOCK_WIDTH * 2 + IMAGE_SPACING, BLOCK_WIDTH * 2, IMAGE_SPACING),
            <View 
            key={`w-${image.id}`}
            style={{ flexDirection: 'column',}}>
              {renderItem(w1Element1, BLOCK_WIDTH, BLOCK_WIDTH, IMAGE_SPACING)}
              {renderItem(w1Element2, BLOCK_WIDTH, BLOCK_WIDTH, IMAGE_SPACING)}
            </View>
          ];

          if (maybeInterchange) elements.reverse();

          return (
            <View 
            key={`x-${image.id}`}
            style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
              {elements}
            </View>
          );
        } else {
          w1Array.push({ ...image, width: BLOCK_WIDTH, height: BLOCK_WIDTH })
        }
      }

      if (image.dimension === H3) {
			if (w1Array.length >= 3) {
          const w1Element1 = w1Array.pop();
          const w1Element2 = w1Array.pop();
          const w1Element3 = w1Array.pop();

          const elements = [
            renderItem(image, BLOCK_WIDTH * 3 + (IMAGE_SPACING * 2), BLOCK_WIDTH * 2, IMAGE_SPACING),
            <View 
            key={`y-${image.id}`}
            style={{ flexDirection: 'column',}}>
              {renderItem(w1Element1, BLOCK_WIDTH, BLOCK_WIDTH, IMAGE_SPACING)}
              {renderItem(w1Element2, BLOCK_WIDTH, BLOCK_WIDTH, IMAGE_SPACING)}
              {renderItem(w1Element3, BLOCK_WIDTH, BLOCK_WIDTH, IMAGE_SPACING)}
            </View>
          ];

          if (maybeInterchange) elements.reverse();

          return (
            <View 
            key={`u-${image.id}`}
            style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
              {elements}
            </View>
          );
        } else {
          w1Array.push({ ...image, width: BLOCK_WIDTH, height: BLOCK_WIDTH });
        }
      }
    });

const w1Rows = (
      <View 
      key={`m-${images.map((_,i)=>i)}`}
      style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
        {w1Array.map((image: any) => renderItem(image, BLOCK_WIDTH, BLOCK_WIDTH, IMAGE_SPACING))}
      </View>
    )
    
    setRows([...rows, ...blockRows, w1Rows]);
  }

  const layout = async () => {
    const processedImages = await processImages(images);
    layoutBricks(processedImages);
  }

  useEffect(() => { layout() }, []);

  const renderItemComponent = (item:any) => {
      return(
      <View 
        key={`tr-${images.map(({id})=> id )}`}
        style={{position:"absolute", flex:1,}}>
        {item}
      </View>
      )
  };

  return (
    <React.Fragment 
      key={`t-${images.map(({id})=> id )}`}>
      <Animated.ScrollView
      removeClippedSubviews
      key={`ft-${images.map(({id})=> id )}`}
      style={StyleSheet.absoluteFill}
      >
      {rows}
      </Animated.ScrollView>
    </React.Fragment>
  );
}

export default Masonry;
/**
 * <AnimatedFlatList
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={StyleSheet.absoluteFill}
        data={rows}
        renderItem={item => renderItemComponent(item)}
        removeClippedSubviews = {true}
        keyExtractor={(_item,id) => id.toString()}
        >
      </AnimatedFlatList>
 * 
 */