/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const toastId = toast.loading("Verifying...");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/verify-email?token=${token}`
        );

        if (res.data.success) {
          navigate("/login");
          toast.success(res.data.message, { id: toastId });
        }

        // if (res.data.success && res.data.message === "You are already verified") {
        //   navigate("/login");
        //   return toast.success(res.data.message, { id: toastId });
        // }
      } catch (error: any) {
        console.log(error);
        if (error.response?.data?.message) {
          const message =
            error.response?.data?.message === "jwt expired"
              ? "Token Expired"
              : error.response?.data?.message;
          toast.error(message, { id: toastId });
        }
      }
    };

    verifyEmail();
  }, [navigate, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6"></div>
  );
}
