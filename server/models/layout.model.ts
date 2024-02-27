import { Schema, Document, model } from "mongoose";

interface faqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface BannerImage extends Document {
  public_id: string;
  url: string;
}

interface Layout extends Document {
  type: string;
  faq: faqItem[];
  categories: Category[];
  banner: {
    image: BannerImage;
    title: string;
    subTitle: string;
  };
}

const faqSchema = new Schema<faqItem>({
  question: String,
  answer: String,
});

const categorySchema = new Schema<Category>({
  title: String,
});

const bannerImageSchema = new Schema<BannerImage>({
  public_id: String,
  url: String,
});

const layoutSchema = new Schema<Layout>({
  type: String,
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: String,
    subTitle: String,
  },
});

const Layout = model<Layout>("Layout", layoutSchema);

export default Layout;
