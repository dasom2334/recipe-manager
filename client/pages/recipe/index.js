import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {modalRequest} from '@/modules/ui/modal';
import {Table} from '@/components';
import {useRouter} from "next/router"
import {useSelector} from 'react-redux';
import {registerRequest} from '@/modules/auth/register';
import {Modal} from '@/components'
const recipeIndex = ({}) => {
    // const [user, setUser] = useState({userid: '', password: ''})
    const dispatch = useDispatch()
    const onClick = e => {
        dispatch(modalRequest(true));
    }
    // const router = useRouter()
    // const onChange = e => {
    //     e.preventDefault()
    //     const {name, value} = e.target;
    //     setUser({
    //         ...user,
    //         [name]: value
    //     })
    // }
    // const {isLoggined, loginUser} = useSelector(state => state.login)
    // const onSubmit = e => {
    //     e.preventDefault()
    //     console.log(`로그인 정보 ${JSON.stringify(user)}`)
    //     console.log(history)
    //     dispatch(loginRequest(user))
    //     console.log(' 모듈에 저장된 로그인값: ' + JSON.stringify(loginUser))
    //     //router.push('/user/profile') 이동시 데이터소실
    // }
    return (
        <> < button className = "btn btn__primary btn__icon" textAlign = "center" onClick = {onClick} > <span>레시피 추가</span>
    </button> <div></div>
    </>
    );
};
const mapStateToProps = state => ({isModalOpen: state.modal.isModalOpen})
const modalRequestAction = {
    modalRequest
}
export default connect(mapStateToProps, modalRequestAction)(recipeIndex);