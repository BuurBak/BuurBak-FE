export type LinkToStripe = {
  expires_at: number;
  created: number;
  url: string;
  object: string;
};

export type CheckStripe = {
  ready_for_payments: boolean;
};
