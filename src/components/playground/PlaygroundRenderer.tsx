import { useState, useEffect, useRef } from 'react';

export interface Props {
  component: string;
  controls: Record<string, string | string[]>;
}

export default function PlaygroundRenderer({ component, controls }: Props) {
  const [props, setProps] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const buildComponentUrl = (currentProps: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    searchParams.set('component', component);

    Object.entries(currentProps).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.set(key, String(value));
      }
    });

    return `/render-component?${searchParams.toString()}`;
  };

  const updateIframe = (currentProps: Record<string, any>) => {
    setLoading(true);
    const url = buildComponentUrl(currentProps);

    // Force iframe to reload by updating the key
    setIframeKey((prev) => prev + 1);

    // The onLoad handler will set loading to false
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
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
    updateIframe(initialProps);
  }, [component, controls]);

  const handlePropChange = (key: string, value: any) => {
    const newProps = { ...props, [key]: value };
    setProps(newProps);
    updateIframe(newProps);
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
          <div className="border rounded-md bg-gray-50 dark:bg-gray-800 min-h-[300px] relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <div className="text-gray-500">Loading...</div>
              </div>
            )}
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={buildComponentUrl(props)}
              className="w-full h-full min-h-[300px] border-0"
              title="Component Preview"
              sandbox="allow-scripts allow-same-origin"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
