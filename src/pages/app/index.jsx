export default function Dashboard() {
  return null;
}

export async function getServerSideProps() {
  return { redirect: { destination: "/app/orders", permanent: true } };
}
