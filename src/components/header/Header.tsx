import * as React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../../utils/constant";
import HeaderSearch from "./HeaderSearch";
import HeaderText from "./HeaderText";
import IconButton from "../common/IconButton";
import { getItemStore } from "../../utils/store";
import { userType } from "../../types";
import TextButton from "../common/TextButton";
import PopupUser from "./PopupUser";

const Header: React.FC<any> = (props) => {
  const { handleBackScreen, detailStory, handleSearch, isLogin } = props;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [user, setUser] = React.useState<userType>();
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    getUser();
  }, [isLogin]);
  
  const getUser = async () => {
    await getItemStore('user').then((dataUser) => {
      if (dataUser != null) {
        let user = JSON.parse(JSON.parse(JSON.stringify(dataUser)));
        setUser(user);
      }
    });
  }

  const onChangeText = (text: string) => {
    setSearchTerm(text)
    handleSearch(text)
  }

  return (
    <View style={styles.header}>
      <IconButton
        name={"chevron-left"}
        size={SIZES.xLarge}
        color={COLORS.primary}
        handlePress={handleBackScreen}
      />
      {
        detailStory ? 
        <HeaderText
          categoryName={detailStory.category}
          storyName={detailStory.story}
        />:
        <HeaderSearch
          searchTerm={searchTerm}
          onChangeText={onChangeText}
        />
      }
      
        { user ?
          <View style={styles.btnUser}>
            <TextButton
              style={styles.btnText}
              styleText={styles.textBtn}
              text={user.name.substring(0,1)}
              handlePress={()=>setIsShow(true)}
            /> 
          </View> :
          <IconButton
            name={"user-circle"}
            size={SIZES.xxxLarge}
            color={COLORS.primary}
            handlePress={()=>setIsShow(true)}
          />
        }
      <PopupUser
        show={isShow}
        user={user ? user : null}
        closePopup={()=>setIsShow(false)}
      />
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  },
  btnUser: {
    width: 36,
    height: 36,
    borderRadius: 25,
    backgroundColor: "#d9004c",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    marginRight: 5
  },
  btnText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textBtn: {
    padding: 4,
    fontSize: SIZES.large,
    textAlign: "center",
    color: COLORS.white,
  }
});
