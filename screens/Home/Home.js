import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import { HorizontalFoodCard, VerticalFoodCard } from '../../Components';
import {FONTS, SIZES, COLORS, icons, dummyData} from "../../constants"
import FilterModal from './FilterModal';

const Home = () =>{
    const Section = ({title, onPress, children}) =>{
        return (
            <View>
                {/* Header */}
                <View 
                style={{flexDirection:"row",
                marginHorizontal:SIZES.padding,
                marginTop:30,
                marginBottom:20
            }}
                >
                    <Text style={{flex:1, ...FONTS.h3}}>
                    {title}
                    </Text>
                    <TouchableOpacity
                        onPress={onPress}
                    >
                        <Text style={{color:COLORS.primary, ...FONTS.body3}}>
                            Show All
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Content */}
                {children}
            </View>
        )
    }

    const [selectedCategoryId, setSelectedCategoryId] = useState(1)
    const [selectedMenuType, setSelectedMenuType] = useState(1)
    const [menuList, setMenuList] = useState([])
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [recommends, setRecommends] = useState([])
    const [popular, setPopular]  = useState([])
    useEffect(()=>{
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, [])

    //handler
    function handleChangeCategory(categoryId, menuTypeId){
        // retrieve the popular menu
        let selectedPopular = dummyData.menu.find(a => a.name == "Popular")

        //retrieve the recommended menu
        let selectedRecommend = dummyData.menu.find(a => a.name == "Recommended")
            //find menu based on menu type id
            let selectedMenu = dummyData.menu.find(a=> a.id == menuTypeId)

            //set the popular menu based on the categoryId
            setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)))

            // set the recommended menu based on categoryId
            setRecommends(selectedRecommend?.list.filter(a=> a.categories.includes(categoryId)))
            // set the menu based on category id  
            setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
    }
    //render
function renderSearch (){
    return (
        <View
            style={{
                flexDirection:"row",
                height: 40,
                alignItems:"center",
                marginVertical: SIZES.base,
                marginHorizontal: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                borderRadius: SIZES.radius,
            }}
        >
            {/* Icon */}
            <Image 
            source={icons.search}
            style={{height: 20,
            width: 20,
            tintColor:COLORS.black
        }}
            />
            {/* Text input */}
            <TextInput 
                style={{
                    flex:1,
                    marginLeft:SIZES.radius,
                    ...FONTS.body3
                }}
                placeholder={"Search Food"}
            />

          
            {/* filter Button */}
            <TouchableOpacity 
            onPress= {()=> setShowFilterModal(true)}
            >
                <Image 
                source={icons.filter}
                style={{width:20,
                        height: 20,
                        tintColor:COLORS.black
                }}
                />
            </TouchableOpacity>
        </View>
    )
}

function renderMenuTypes(){
    return (
        <FlatList 
            horizontal
            data={dummyData.menu}
            keyExtractor={item => `${item.id}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                marginTop:30,
                marginBottom:20
            }}
                renderItem={({item, index})=>(
                    <TouchableOpacity
                        style={{
                            marginLeft:SIZES.padding,
                            marginRight:index == dummyData.menu.length - 1? SIZES.padding : 0
                        }}
                        onPress={()=>{
                            setSelectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId, item.id)
                        }}
                    >
                        <Text
                            style={{
                                color:selectedMenuType == item.id? COLORS.primary: COLORS.black,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
        />

      
    )
}

function renderRecomendedSection(){
    return (
        <Section
            title={"Recommended"}
            onPress={()=> console.log("show all recommended") }
        >
            <FlatList 
                data={recommends}
                keyExtractor={item =>  `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index})=>(
                    <HorizontalFoodCard 
                    containerStyle={{
                        height:180,
                        width:SIZES.width*0.85,
                        marginLeft:index == 0? SIZES.padding : 18,
                        marginRight:index== recommends.length - 1? SIZES.padding : 0,
                        padingRight: SIZES.radius,
                        alignItems:"center"
                    }}
                    imageStyle={{
                        marginTop:35,
                        height:150,
                        width:150
                    }}
                    item={item}
                    onpress={()=>console.log("HorizontalFoodCard")}
                     />
    )}
            />
        </Section>
    )
}

function renderPopularSection(){
    return(
        <Section 
        title="Popular Near you"
        onPress={()=> console.log("show all popular items ")}
        >
            <FlatList 
                data={popular}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index})=>(
                    <VerticalFoodCard
                        containerStyle={{
                            marginLeft:index ==0 ? SIZES.padding:18,
                            marginRight: index == popular.length - 1? SIZES.padding : 0
                        }}
                        item={item}
                        onPress={()=> console.log("vertical food card")}
                    />
                     )}
            />
        </Section>
    )
}

function renderFoodCateogries(){
    return (
        <FlatList
            data={dummyData.categories}
            keyExtractor={item => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index})=> (
                <TouchableOpacity 
                style={{
                    flexDirection:"row",
                    height:55,
                    marginTop:SIZES.padding,
                    marginLeft: index ==0 ? SIZES.padding : SIZES.radius,
                    marginRight: index == dummyData.categories.length -1 ? SIZES.padding : 0,
                    paddingHorizontal:8,
                    borderRadius:SIZES.radius,
                    backgroundColor:selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2
                }}
                onPress={()=> {setSelectedCategoryId(item.id )
                            handleChangeCategory(item.id, selectedMenuType)}
                }
                >
                    <Image
                        source={item.icon}
                        style={{
                            marginTop:5,
                            height:50,
                            width:50,
                        }}
                    />
                    <Text 
                        style={{
                            alignSelf:"center",
                            marginRight:SIZES.base,
                            color: selectedCategoryId == item.id? COLORS.white : COLORS.darkGray,
                            ...FONTS.h3,
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
        >

        </FlatList>
    )
}
function renderDeliveryTo(){
    return (
        <View
            style={{
                marginTop:SIZES.padding,
                marginHorizontal:SIZES.padding,

            }}
        >
            <Text 
            style={{
                color:COLORS.primary,
                ...FONTS.body3,
            }}
            >
                DELIVERY TO 
            </Text>
            <TouchableOpacity 
                style={{
                    flexDirection:"row",
                    marginTop:SIZES.base,
                    alignItems:"center",

                }}
            >
                <Text
                    style={{
                     ...FONTS.h3   
                    }}
                >   
                    {dummyData.myProfile.address}
                </Text>
                    <Image
                        source={icons.down_arrow}
                        style={{
                            marginLeft:SIZES.radius,
                            height: 20,
                            width: 20,
                            padding:SIZES.radius
                        }}
                    />
            </TouchableOpacity>
        </View>
    )

}
return (
    <View
    style={{
        flex:1
    }}
    >
        {/* Search */}
        {renderSearch()}

        {/* filter */}
        {showFilterModal && 
        <FilterModal
            isVisible={showFilterModal}
            onClose={()=> setShowFilterModal(false)}
        />
        }

        {/* List */}
        <FlatList 
            data={menuList}
            keyExtractor={(item=> `${item.id}`)}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
                    {/* Delivery to  */}
                    {renderDeliveryTo()}
                    {/* Food Categories */}
                    {renderFoodCateogries()}
                    {/* popular */}
                    {renderPopularSection()}
                    {/* Recommended menuType */}
                    {renderRecomendedSection()}
                    {/* Menu Type */}
                    {renderMenuTypes()}
                </View>
            }
            renderItem={({item, index}) =>{
                return (
                 <HorizontalFoodCard
                    containerStyle={{
                        height: 130,
                        alignItems:"center",
                        marginHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius
                    }}
                    imageStyle={{
                      marginTop: 20,
                      height: 110,
                      width:110   
                     }}
                     item={item}
                     onPress={()=>console.log("Horizontal foodacrd")}
                 />
                )
            }}
            ListFooterComponent={
                <View 
                style={{height:200}}
                />
              
            }
        />

    </View>
    
)
}
export default Home;