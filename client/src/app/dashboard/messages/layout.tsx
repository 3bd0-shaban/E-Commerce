import ChatWrapper from "./ChatWrapper";

export const metadata = {
  title: "Messages",
};
export default function Layout({
  children, params,
}: {
  children: React.ReactNode; params: {
    foo: string;
  };
}) {

  params.foo = "bar";
  return (
    <ChatWrapper>
      {children}
    </ChatWrapper>
  );
}
