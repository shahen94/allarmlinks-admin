import Typography from '@material-ui/core/Typography';

import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

interface SocialLinksProps {
  fieldName: String | null | undefined;
  link: string | undefined;
}

const SocialLinks: FC<SocialLinksProps> = ({ fieldName, link }) => {
  function makeShortLink(link: string) {
    return `${link.slice(0, 25)}...`;
  }

  return (
    <div className="socialLink">
      <Typography color="textSecondary" variant="body1" component="span">
        {fieldName}
      </Typography>
      <Link
        style={{
          color: '#87C6F0',
        }}
        href={link}
      >
        {link ? makeShortLink(link) : null}
      </Link>
    </div>
  );
};

export default SocialLinks;
