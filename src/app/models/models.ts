export interface Video {
  id: string;
  name: string;
  watched: boolean;
  endDate: Date;
  themes: Theme[];
}

export interface Theme {
  id: string;
  text: string;
  isClicked: boolean;
  userTimeStamp: number;
}
