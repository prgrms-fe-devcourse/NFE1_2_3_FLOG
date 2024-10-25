import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import closePw from "../../shared/assets/auth-icons/closePw.png";
import openPw from "../../shared/assets/auth-icons/openPw.png";
import { useNavigate } from "react-router-dom";

const black = "#212529";
const gray = "#7D7D7D";

const Form = styled.form`
  width: 600px;
  height: 850px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${gray};
  margin: auto;
  margin-top: 200px;
`;

const Title = styled.h1`
  margin: 50px auto;
`;

const DetailForm = styled.div`
  width: 600px;
  height: 110px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 20px;
  align-items: center;
`;

const TextLabel = styled.label`
  width: 400px;
  height: 20px;
  color: ${black};
`;

const Input = styled.input`
  width: 400px;
  height: 30px;
  color: ${black};
  border: 1px solid ${gray};
  border-radius: 5px;
`;

const InputIcon = styled.img`
  position: absolute;
  margin-top: 32px;
  margin-left: 360px;
  width: 18px;
  height: 12px;
  cursor: pointer;
`;

const WarningMessage = styled.div`
  width: 400px;
  height: 15px;
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 400px;
  margin: 0 auto;
  margin-top: 30px;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 180px;
  height: 40px;
  border: 1px solid ${black};
  color: ${black};
  cursor: pointer;
`;

const SignupForm = () => {
  // 내비게이터
  const navigate = useNavigate();

  // 타이핑 받은 데이터 저장
  const [form, setForm] = useState({
    id: "",
    validId: false,
    nonDuplicationId: false,
    password: "",
    validPassword: false,
    passwordCheck: "",
    validPasswordCheck: false,
    nickname: "",
    validNickname: false,
    nonDuplicationNickname: false,
  });

  // 타이핑 데이터 : 유효성 검사
  const [validation, setValidation] = useState(false);

  const checkValidation = (currentForm: any) => {
    // ID 유효성 검사
    const idRegex = /^[a-zA-Z0-9]{8,16}$/;
    const validId = idRegex.test(currentForm.id);

    // PW 유효성 검사
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`])[a-zA-Z\d!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`]{8,16}$/;
    const validPassword = passwordRegex.test(currentForm.password);

    // PW-Check 유효성 검사
    const validPasswordCheck = currentForm.password === currentForm.passwordCheck;

    // Nickname 유효성 검사
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,16}$/;
    const validNickname = nicknameRegex.test(currentForm.nickname);

    // 모든 유효성 검사를 통과 시 -> 회원가입 요청 가능하도록
    if (validId && validPassword && validPasswordCheck && validNickname) {
      setValidation(true);
    }
    setForm((prevForm) => ({
      ...prevForm,
      validId,
      validPassword,
      validPasswordCheck,
      validNickname,
    }));
  };

  // 아이디 중복 확인
  const isDuplicationId = () => {
    // 1. 아이디를 서버로 전달
    // 1-1. 중복 O -> 다시 작성하도록 유도
    // 1-2. 중복 X -> 계속 진행
  };

  // 타이핑 데이터 : Axios를 통해 서버로 전달 -> 서버에서도 유효성 검사 진행
  const onClickSignupButton = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", {
        userId: form.id,
        password: form.password,
        passwordCheck: form.passwordCheck,
        nickname: form.nickname,
      });
      alert(`회원가입 완료`);
      navigate("/signin");
    } catch (error: any) {
      alert(`실패 : ${error.response?.data?.message || "회원가입 실패"}`);
    }
  };

  // 비밀번호 창 내 "아이콘" 클릭시 비밀번호 보여주기.
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const handlerPasswordIcon = () => {
    setIsOpenPassword((prev) => !prev);
  };

  return (
    <div>
      <Form>
        <Title>회원가입</Title>
        <DetailForm>
          <TextLabel>아이디</TextLabel>
          <Input
            name="id"
            placeholder="아이디를 입력해주세요"
            type="text"
            onChange={(e) => {
              const newId = e.target.value;
              setForm((prev) => {
                const updatedForm = { ...prev, id: newId };
                checkValidation(updatedForm);
                return updatedForm;
              });
            }}
          ></Input>
          {!form.validId && <WarningMessage>사용 할 수 없는 아이디입니다</WarningMessage>}
        </DetailForm>
        <DetailForm>
          <TextLabel>비밀번호</TextLabel>
          <Input
            name="pw"
            placeholder="비밀번호를 입력해주세요"
            type={isOpenPassword ? "text" : "password"}
            onChange={(e) => {
              const newPassword = e.target.value;
              setForm((prev) => {
                const updatedForm = { ...prev, password: newPassword };
                checkValidation(updatedForm);
                return updatedForm;
              });
            }}
          ></Input>
          <InputIcon
            onClick={handlerPasswordIcon}
            src={isOpenPassword ? closePw : openPw}
            alt="isOpenPasswordIcon"
          ></InputIcon>
          {!form.validPassword && (
            <WarningMessage>
              특수문자, 영문자, 숫자가 혼합된 8~16자리 비밀번호를 입력해주세요
            </WarningMessage>
          )}
        </DetailForm>
        <DetailForm>
          <TextLabel>비밀번호 확인</TextLabel>
          <Input
            name="pw-check"
            placeholder="비밀번호를 입력해주세요"
            type={isOpenPassword ? "text" : "password"}
            onChange={(e) => {
              const newPasswordCheck = e.target.value;
              setForm((prev) => {
                const updatedForm = {
                  ...prev,
                  passwordCheck: newPasswordCheck,
                };
                checkValidation(updatedForm);
                return updatedForm;
              });
            }}
          ></Input>
          <InputIcon
            onClick={handlerPasswordIcon}
            src={isOpenPassword ? closePw : openPw}
            alt="isOpenPasswordIcon"
          ></InputIcon>
          {!form.validPasswordCheck && (
            <WarningMessage>비밀번호가 일치하지 않습니다</WarningMessage>
          )}
        </DetailForm>
        <DetailForm>
          <TextLabel>닉네임</TextLabel>
          <Input
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            type="text"
            onChange={(e) => {
              const newNickname = e.target.value;
              setForm((prev) => {
                const updatedForm = {
                  ...prev,
                  nickname: newNickname,
                };
                checkValidation(updatedForm);
                return updatedForm;
              });
            }}
          ></Input>
          {!form.validNickname && <WarningMessage>사용 할 수 없는 닉네임입니다</WarningMessage>}
        </DetailForm>
        <ButtonBox>
          <Button onClick={() => {}}>가입취소</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              validation ? onClickSignupButton() : alert("올바른 회원가입 형식이 아닙니다");
            }}
          >
            가입하기
          </Button>
        </ButtonBox>
      </Form>
    </div>
  );
};

export default SignupForm;
