import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {MyText, Photo} from 'component';

const CONTACT = [
  {
    id: 1,
    name: 'Thi Nguyen',
    lastMessage: 'Haha',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 2,
    name: 'Thay Đổi',
    lastMessage: ':v',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 3,
    name: 'Nguyên Huân',
    lastMessage: 'Toạc',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 4,
    name: 'Trâm Bảo',
    lastMessage: 'Tới đê',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 5,
    name: 'Huỳnh Long',
    lastMessage: 'Okie',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 6,
    name: 'Phạm Thị Đông Thìn',
    lastMessage: 'Nói moẹ cho rồi',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 7,
    name: 'Kenny Al',
    lastMessage: 'Có tuyển nơi á',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 8,
    name: 'Quốc Tài',
    lastMessage: 'Lo vl',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 9,
    name: 'Phúc Lê',
    lastMessage: 'Cười',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 10,
    name: 'Sáu Châu',
    lastMessage: 'Alo a',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 11,
    name: 'Hạ Nhật',
    lastMessage: 'Okie làm thứ khác',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 12,
    name: 'Minh Tú',
    lastMessage: 'Mệt mỏi',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 13,
    name: 'Phạm Xuân Duy',
    lastMessage: 'a dũng',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 14,
    name: 'Vũ Phi Trần',
    lastMessage: 'Uk',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 15,
    name: 'Nguyễn Trung',
    lastMessage: 'Kinh rứa thờ ương thương',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 16,
    name: 'Nguyễn Thị Anh Đào',
    lastMessage: 'Ngon lành',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 17,
    name: 'Phan Vy',
    lastMessage: 'Haha',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 18,
    name: 'Minh Phan',
    lastMessage: 'Reset em',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
  {
    id: 19,
    name: 'Phạm Thị Ngọc Anh',
    lastMessage: 'Ghê rứa',
    image: 'https://picsum.photos/200/200',
    createdAt: '20:45',
  },
];

const ChatItem = ({item, onPress}) => {
  const onChatPress = () => {
    onPress && onPress(item);
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onChatPress}>
      <Photo
        source={{uri: `${item.image}?random=${item.id}`}}
        placeholderColor={'#86A8E7'}
        style={styles.itemAvatar}
        delay={1500}
      />
      <View style={styles.itemMessageContainer}>
        <MyText type="semibold-14">{item.name}</MyText>
        <View style={styles.itemTimeContainer}>
          <MyText
            numberOfLines={1}
            style={styles.itemLastMessage}
            type="regular-14">
            {item.lastMessage}
          </MyText>
          <MyText type="medium-14">{item.createdAt}</MyText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ContactItem = ({item, onPress}) => {
  const onContactPress = () => {
    onPress && onPress(item);
  };
  return (
    <TouchableOpacity
      style={styles.headerItemContainer}
      onPress={onContactPress}>
      <Photo
        source={{uri: `${item.image}?random=${item.id}`}}
        placeholderColor={'#86A8E7'}
        style={styles.headerItemAvatar}
        delay={1500}
      />
      <MyText
        type="semibold-14"
        align="center"
        numberOfLines={2}
        style={styles.headerItemName}>
        {item.name}
      </MyText>
    </TouchableOpacity>
  );
};

const Chat = ({componentId}) => {
  const renderItem = ({item, index}) => {
    return <ChatItem item={item} key={index} onPress={(item) => {}} />;
  };

  const renderHeaderItem = ({item, index}) => {
    return <ContactItem item={item} key={index} onPress={(item) => {}} />;
  };

  const renderHeader = () => {
    return (
      <FlatList
        data={CONTACT}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderHeaderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CONTACT}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={styles.headerStyle}
        keyExtractor={(item) => `${item.id}`}
      />
    </SafeAreaView>
  );
};

Chat.options = {};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    paddingVertical: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  itemMessageContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  itemTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLastMessage: {
    paddingRight: 8,
  },
  headerItemContainer: {
    maxWidth: 90,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerItemAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerItemName: {
    paddingTop: 5,
  },
});
