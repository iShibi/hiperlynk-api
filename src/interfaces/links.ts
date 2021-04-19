import type { Document } from 'mongoose';

/**
 * The interface for an icon object in the LinkSchemaInterface
 */
export interface IconObjectInterface {
  /**
   * The url of the icon
   */
  icon_url: string;

  /**
   * The text to show when user hovers over the icon
   */
  hover_text?: string;

  /**
   * The alt text for the icon
   */
  alt_text?: string;
}

/**
 * The interface for LinkSchema
 */
export interface LinkSchemaInterface {
  /**
   * The name of the website
   */
  name: string;

  /**
   * The url of the website
   */
  url: string;

  /**
   * The icon for the link
   */
  icon: IconObjectInterface;

  /**
   * The username of the user who added the link
   */
  username: string;
}

export type LinkModelInterface = LinkSchemaInterface & Document;
