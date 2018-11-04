import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    TextInput,
    AppRegistry,
    Keyboard
} from 'react-native';

const {width, height} = Dimensions.get('window');

class Demo extends Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this._buttonFrame = null;
        this.state = {
            isShow: false,
            dataSource: ds.cloneWithRows(this._renderList())
        }
        this.renderRow = this._renderRow.bind(this);
    }

    componentWillMount() {
        //监听键盘弹出事件
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this.keyboardDidShowHandler.bind(this));
        //监听键盘隐藏事件
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this.keyboardDidHideHandler.bind(this));
    }

    componentWillUnmount() {
        //卸载键盘弹出事件监听
        if (this.keyboardDidShowListener != null) {
            this.keyboardDidShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardDidHideListener != null) {
            this.keyboardDidHideListener.remove();
        }
    }

    //键盘弹出事件响应
    keyboardDidShowHandler(event) {
        this.setState({KeyboardShown: true});
        console.log(event.endCoordinates.height);
        console.log('弹出键盘');
        console.log(this.state.isShow);
        this.state.isShow?
        this.show('assd'):null;

    }

    //键盘隐藏事件响应
    keyboardDidHideHandler(event) {
        console.log('键盘隐藏');
        this.state.isShow?
        this.show('jas'):null
    }

    //强制隐藏键盘
    dismissKeyboard() {
        Keyboard.dismiss();
    }

    _renderList() {
        var dataList = [];
        for (var i = 0; i < 20; i++) {
            let number = i;
            dataList.push(<Text style={{
                fontSize: 16, color: 'white', backgroundColor: 'transparent', textAlign: 'center'
            }}
                                onPress={() => {
                                    console.log(('条目....' + number));
                                    this.dismissKeyboard();
                                    this.setState({
                                        isShow: false
                                    });

                                }}>条目.....+{i}</Text>);
        }
        return dataList;
    }


    _renderRow(data) {
        return (
            <View>
                {data}
            </View>
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <TextInput
                    underlineColorAndroid={'transparent'}
                    style={{width: 200, height: 60, backgroundColor: 'purple'}}

                    ref={ref => this.textInput = ref}
                    onChangeText={(text) => {
                        this.show(text)
                    }}/>

                {this._renderModal()}

            </View>);
    }

    _renderModal() {
        console.log(this._buttonFrame);
        console.log(this.state.isShow);
        if (this._buttonFrame && this.state.isShow) {
            const frameStyle = this._calcPosition();

            console.log(frameStyle);
            return (

                <ListView
                    style={[frameStyle, {
                        width: 200,
                        backgroundColor: 'red',
                        position: 'absolute'
                    }]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    keyboardShouldPersistTaps={'handled'}
                />
            );
        }
    }

    _updatePosition(callback) {
        // if (!this._buttonFrame) {
        // this.textInput.measure((fx, fy, width, height, px, py) => {
        //     console.log('Component width is: ' + width)
        //     console.log('Component height is: ' + height)
        //     console.log('X offset to frame: ' + fx)
        //     console.log('Y offset to frame: ' + fy)
        //     console.log('X offset to page: ' + px)
        //     console.log('Y offset to page: ' + py)
        // });
        if (this.textInput && this.textInput.measure) {
            this.textInput.measure((fx, fy, width, height, px, py) => {
                this._buttonFrame = {x: px, y: py, w: width, h: height};
                callback();
            });
        }
    }

    show(text) {
        if (text === '') {
            this.setState({
                isShow: false
            })
        } else {
            this._updatePosition(() => {
                console.log('callback');
                this.setState({
                    isShow: true,
                    dataSource: this.state.dataSource.cloneWithRows(this._renderList())
                });
            });

        }
    }

    _calcPosition() {

        const dimensions = Dimensions.get('window');
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;

        const dropdownHeight = 300;


        const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
        const rightSpace = windowWidth - this._buttonFrame.x;
        const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
        const showInLeft = rightSpace >= this._buttonFrame.x;

        const positionStyle = {
            height: dropdownHeight,
            top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight),
        };

        if (showInLeft) {
            positionStyle.left = this._buttonFrame.x;

        } else {
            const dropdownWidth = 300;
            if (dropdownWidth !== -1) {
                positionStyle.width = dropdownWidth;
            }
            positionStyle.right = rightSpace - this._buttonFrame.w;
        }
        positionStyle.width = 300;

        return positionStyle;
    }


}

AppRegistry.registerComponent('Demo', () => Demo);
