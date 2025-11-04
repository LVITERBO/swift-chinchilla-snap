import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-arvoh-blue text-white">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-arvoh-blue-DEFAULT">Bem-vindo ao Seu Aplicativo</h1>
        <p className="text-lg text-arvoh-blue-muted-foreground mb-6">
          Explore seu novo Painel Financeiro!
        </p>
        <Link to="/finance-dashboard">
          <Button className="px-6 py-3 text-base">Ir para o Painel Financeiro</Button>
        </Link>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;