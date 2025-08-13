import { useState, useEffect } from 'react';

export interface Props {
  component: string;
  controls: Record<string, string | string[]>;
}

export default function PlaygroundRenderer({ component, controls }: Props) {
  const [props, setProps] = useState<Record<string, any>>({});
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComponentHTML = async (currentProps: Record<string, any>) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      searchParams.set('component', component);
      
      Object.entries(currentProps).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.set(key, String(value));
        }
      });

      const response = await fetch(`/render-component?${searchParams.toString()}`);
      if (response.ok) {
        const htmlContent = await response.text();
        setHtml(htmlContent);
      } else {
        setHtml('<div class="text-red-500">Error loading component</div>');
      }
    } catch (error) {
      setHtml('<div class="text-red-500">Failed to render component</div>');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialProps: Record<string, any> = {};
    
    Object.entries(controls).forEach(([key, control]) => {
      if (Array.isArray(control)) {
        initialProps[key] = control[0];
      } else if (control === 'boolean') {
        initialProps[key] = false;
      } else if (control === 'text') {
        initialProps[key] = key === 'children' ? component : '';
      }
    });

    setProps(initialProps);
    fetchComponentHTML(initialProps);
  }, [component, controls]);

  const handlePropChange = (key: string, value: any) => {
    const newProps = { ...props, [key]: value };
    setProps(newProps);
    fetchComponentHTML(newProps);
  };

  return (
    <div className="border rounded-lg p-6 bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Controls</h3>
          <div className="space-y-4">
            {Object.entries(controls).map(([key, control]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {key}
                </label>
                {Array.isArray(control) ? (
                  <select
                    value={props[key] || ''}
                    onChange={(e) => handlePropChange(key, e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  >
                    {control.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : control === 'boolean' ? (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={props[key] || false}
                      onChange={(e) => handlePropChange(key, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {props[key] ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                ) : (
                  <input
                    type="text"
                    value={props[key] || ''}
                    onChange={(e) => handlePropChange(key, e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800 min-h-[200px] flex items-center justify-center">
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              <div 
                dangerouslySetInnerHTML={{ __html: html }}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}