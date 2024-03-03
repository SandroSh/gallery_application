export type MyResponseData = {
  id: string;
  description: string;
  likes: number;
  links: {
    download: string;
  };
  urls: {
    small: string;
    regular: string;
    raw: string;
  };

  user: {
    name: string;
    portfolio_url: string;
    profile_image: {
      large: string;
    };
  };
};
export type MySearchResponseData = {
  id: string;
  description: string;
  likes: string;
  user: {
    name: string;
    portfolio_url: string;
    profile_image: {
      large: string;
    };
    links: {
      download: string;
    };
  };
  urls: {
    small: string;
    regular: string;
    raw: string;
  };
};

export type statsType = {
  downloads: {
    total: number;
  };
  likes: {
    total: number;
  };
  views: {
    total: number;
  };
};
export interface logType {
  text: string;
  currTime: string;
}

export interface ModalProps {
  closeModal: (newValue: boolean) => void;
  imageData: MyResponseData | null;
}

export interface newModalProps {
  closeModal: (newValue: boolean) => void;
  id: string;
  image: string;
  name: string;
  profileImage: string;
  portfolioUrl: string;
  
}
