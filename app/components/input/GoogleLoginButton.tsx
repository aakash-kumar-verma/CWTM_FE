import React from "react";

type GoogleLoginButtonProps = {
  onClick: () => void;
};
const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3
    rounded border border-gray-300 bg-white px-4 py-2
    font-medium text-gray-800 hover:bg-gray-50 cursor-pointer"
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
        <path
          fill="#4285F4"
          d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11
      c-.5 2.5-1.9 4.6-4.1 6v5h6.6c3.9-3.6 6.1-8.8 6.1-14.7Z"
        />
        <path
          fill="#34A853"
          d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5
      c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.1
      C9.2 39.6 16.1 44 24 44Z"
        />
        <path
          fill="#FBBC05"
          d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.1H5.8
      a20 20 0 0 0 0 17.6l6.8-5.1Z"
        />
        <path
          fill="#EA4335"
          d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8
      C34.1 6.1 29.5 4 24 4 16.1 4 9.2 8.4 5.8 15.2
      l6.8 5.1c1.6-4.8 6.1-8.2 11.4-8.2Z"
        />
      </svg>
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
