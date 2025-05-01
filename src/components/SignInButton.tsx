//  test用　後ほど削除

'use client';

import { useAuth } from '@/hooks/useAuth';

export const SignInButton = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>こんにちは、{user.displayName}</p>
          <button onClick={logout}>ログアウト</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Googleでログイン</button>
      )}
    </div>
  );
};
