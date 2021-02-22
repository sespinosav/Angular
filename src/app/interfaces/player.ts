import { Country } from "src/environments/country";
import { SquadNumber } from "src/environments/squadNumber";

export interface Player {
    $key?: string;
    name: string;
    lastName: string;
    position: SquadNumber;
    weight: number;
    height: number;
    nationality: Country;
    leftFooted: boolean;
}

