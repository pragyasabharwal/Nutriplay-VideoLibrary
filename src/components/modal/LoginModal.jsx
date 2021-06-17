import { useNavigate } from "react-router";
import { useDataContext } from "../context/DataContext";
import "./LoginModal.css";

export const LoginModal = () => {
  const { setModal } = useDataContext();
  const navigate = useNavigate();
  return (
    <div className="modal-1">
      <br />
      <span className="modal-heading">You need to login to continue</span>
      <div className="flex">
        <button
          className="button-primary margin-1"
          onClick={() => setModal(false)}
        >
          Cancel
        </button>
        <button
          className="button-primary margin-1"
          onClick={() => {
            setModal(false);
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
