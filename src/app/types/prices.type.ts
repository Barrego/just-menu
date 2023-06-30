import { ISingleData } from "./api.types";

export interface IPrice {
    id: number;
    amount: number;
    urlProduct?: string;
    market: ISingleData<IMarket>;
};

export interface IMarket {
    id: number;
    name: string;
};

export interface IMarketPrice<MarketName = "Dia" | "Carrefour" | "Mercadona"> {
    name: MarketName;
    amount: number;
};

export interface IMarketPrices {
    dia: IMarketPrice<"Dia">;
    carrefour: IMarketPrice<"Carrefour">;
    mercadona: IMarketPrice<"Mercadona">;
};
