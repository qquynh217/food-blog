import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [
            {
                id: 0,
                title: "",
                desc: "",
                thumb: "",
                text: "",
                timeUpdate: "",
                timeRead: "",
                comments: [],
                slug: ""
            },
            {
                id: 1,
                title: "Chè kho Nam Định",
                desc: "Chỉ cần nhắc đến tên món ăn này thôi đã thấy được hương vị của đất trời, con người Nam Định",
                thumb: "https://amthucvietnam365.vn/wp-content/uploads/2021/06/2-7.jpg",
                text: "Chè kho cũng là món ăn đặc sản của Nam Định mà không cần quá nhiều nguyên liệu để làm món ăn này. Nhưng chỉ cần nhắc đến tên món ăn này thôi đã thấy được hương vị của đất trời, con người Nam Định.Được làm bằng những hạt đỗ xanh qua bàn tay khéo léo của người nấu với một lượng vừa đủ để có những đĩa chè không quá ngọt, vừa miệng. Du khách ăn thử một miếng chè mềm mềm, thơm ngon, thanh mát mới thấy được vị đậm đà đặc trưng của con người Nam Định gần gũi. Chỉ cần cảm nhận được hương vị ấy thôi đã để lại trong lòng du khách một dư âm khó quên. Những ngày hè hay những dịp lễ tết, ăn miếng chè kho nhâm nhi chèn trà nóng bên cạnh gia đình thật khiến du khách trân trọng những giây phút ấm áp, tuyệt vời này.",
                timeUpdate: "26/11/2022",
                timeRead: "1",
                slug: "che-kho-nam-dinh",
                comments: [
                    {
                        user: "trangnek.png",
                        content: "Một món ăn tuyệt vời !!!",
                        time: ''
                    },
                    {
                        user: "QQuynh",
                        content: "Nhất định phải thử món ăn này 1 lần khi đến Nam Định.",
                        time: ''
                    }
                ],
            }
        ]
    },
    reducers: {
        addPost: (state, action) => {
            state.posts = [...state.posts, action.payload]
        }

    }
})
export const { addPost } = postSlice.actions
export default postSlice.reducer