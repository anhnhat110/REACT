import { useState } from 'react';

import Header from './component/Header.jsx';
import UserInput from './component/UserInput.jsx';
import Results from './component/Results.jsx';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = userInput.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput  onChange={handleChange} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <Results input={userInput} />}
    </>
  );
}

export default App;
// Trong ví dụ của bạn, App quản lý state userInput và truyền xuống UserInput.
// UserInput nhận props onChange từ App và gọi lại khi người dùng thay đổi giá trị trong form.
// onChange trong App cập nhật state userInput dựa trên thông tin được truyền từ UserInput.
// Việc cập nhật state dẫn đến re-render component App, đồng thời cập nhật props cho Results.
// Results nhận props input chứa thông tin đầu tư mới và hiển thị kết quả tính toán tương ứng.