export interface Video {
  id: string;
  name: string;
  watched: boolean;
  endDate: Date;
  timestamps: Theme[];
}

export interface Theme {
  id: string;
  text: string;
  isClicked: string;
  userTimeStamp: string;
}
