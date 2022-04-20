import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import { HorizontalFoodCard } from '../../Components';
import {FONTS, SIZES, COLORS, icons, dummyData} from "../../constants"

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
    const [recommends, setRecommends] = useState([])
    const [popular, setPopular]  = useState([])
    useEffect(()=>{
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, [])

    //handler
    function handleChangeCategory(categoryId, menuTypeId){
        // retrieve the popular menu
        let selectedPopular = dummyData.menu.find(a => a.name == "recommended")

        //retrieve the recommended menu
        let selectedRecommend = dummyData.menu.find(a => a.name === "Recommended")
            //find menu based on menu type id

            // set the recommended menu based on categoryId
            setRecommends(selectedRecommend?.list.filter(a=> a.categories.includes(categoryId)))
            let selectedMenu = dummyData.menu.find(a=> a.id == menuTypeId)
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
            // onPress
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
                renderItem={({item, index})=>{
                    <HorizontalFoodCard 
                    containerStyle={{
                        height:180,
                        width:SIZES.width*0.85,
                        marginLeft:index == 0? SIZES.padding : 0,
                        padingRight: SIZES.radius   ,
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
                }}
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

        </Section>
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
        {/* List */}
        <FlatList 
            data={menuList}
            keyExtractor={(item=> `${item.id}`)}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
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
        />

    </View>
    
)
}
export default Home;