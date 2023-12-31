import * as Yup from 'yup';

import { FormCommentModel } from '../models/form';
import { Shape } from '../models/common';

function getCommentSchema() {
  return Yup.object<Shape<FormCommentModel>>({
    content: Yup.string().required()
  });
}


export { getCommentSchema };
