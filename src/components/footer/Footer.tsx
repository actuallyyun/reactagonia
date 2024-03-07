export default function Footer() {
  return (
    <footer className='grid gap-4 md:grid-cols-2 bg-black text-white py-12'>
      <li role='treeitem' className='grid gap-4'>
        <h1 className='text-center'>Get Help</h1>
        <div className='grid gap-4 text-center'>
          <a href='#' className='btn'>
            Customer Service
          </a>
          <a href='#' className='btn'>
            Delivery
          </a>
          <a href='#' className='btn'>
            FAQs
          </a>
          <a href='#' className='btn'>
            Repairs
          </a>
          <a href='#' className='btn'>
            Returns
          </a>
          <a href='#' className='btn'>
            Login
          </a>
          <a href='#' className='btn'>
            Contact Form
          </a>
          <a href='#' className='btn'>
            Size Guide
          </a>
        </div>
      </li>
      <li role='treeitem' className='grid gap-4'>
        <h1 className='text-center'>Information</h1>
        <ul role='group' className='grid gap-4 text-center'>
          <li role='treeitem'>
            <a href='#'>
              <span className='footer-sitemap_content'>
                Catagonia Action Works
              </span>
            </a>
          </li>
          <li role='treeitem'>
            <a href='#'>
              <span className='footer-sitemap_content'>Notice</span>{' '}
            </a>
          </li>
          <li role='treeitem'>
            <a href='#'>
              <span className='footer-sitemap_content'>
                Terms and Conditions
              </span>
            </a>
          </li>
          <li role='treeitem'>
            <a href='#'>
              <span className='footer-sitemap_content'>Sale</span>
            </a>
          </li>
          <li role='treeitem'>
            <a href='#'>
              <span className='footer-sitemap_content'>Careers</span>
            </a>
          </li>
          <li role='treeitem'>
            <a href='#'>
              <span className='footer-sitemap_content'>Press</span>
            </a>
          </li>
        </ul>
      </li>
    </footer>
  )
}
